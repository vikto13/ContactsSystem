<template>
    <div>
        <slot></slot>
        <div class="m-5">
            <h1 style="font-weight: normal">{{ navBar.relationship.title }}</h1>
            <field-to-create
                v-show="havePermission('edit_structure')"
                :text="'Pridėti naują struktūrą'"
                @pressed="SHOW_DIALOG('add-relationship')"
            >
            </field-to-create>

            <div class="card text-bg-light">
                <div class="card-header">
                    <ul class="nav nav-pills card-header-pills">
                        <li
                            v-for="(component, index) in relations"
                            :key="index"
                            class="nav-item"
                        >
                            <a
                                class="nav-link navbar-light"
                                :href="`#/relationship/record/${component.name}`"
                                :class="
                                    component.name == id
                                        ? 'active disabled'
                                        : ''
                                "
                                :style="{
                                    color:
                                        component.name != id ? '#414042' : null,
                                    textDecoration: 'none',
                                    backgroundColor:
                                        component.name != id ? null : '#1f3f77',
                                }"
                                >{{ navBar[component.name].title }}</a
                            >
                        </li>
                    </ul>
                </div>
                <md-table
                    v-if="showCompanies.length"
                    v-model="showCompanies"
                    md-card
                    md-sort="created"
                    md-sort-order="asc"
                    md-fixed-header
                    class="table-footer"
                >
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Pavadinimas" md-sort-by="name">
                            {{ item.name }}
                        </md-table-cell>
                        <md-table-cell md-label="Veiksmas">
                            <md-button
                                v-show="havePermission('edit_structure')"
                                class="md-dense md-raised md-primary edit-btn w-50 m-1"
                                @click="() => edit(item)"
                                >Redaguoti</md-button
                            >
                            <md-button
                                v-show="havePermission('delete_structure')"
                                class="md-dense md-raised md-primary delete-btn w-25 m-1"
                                @click="() => deleting(item)"
                                >Ištrinti</md-button
                            >
                        </md-table-cell>
                    </md-table-row>
                </md-table>
                <h5 v-else class="m-5 text-center">
                    {{ navBar[id].whose }} neturi struktūrų
                </h5>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FieldToCreate from '../components/fields/FieldToCreate.vue'
import { ContactsMixin } from './mixins/ContactsMixin'
import { LoginMixin } from './mixins/LoginMixin'
export default {
    props: {
        id: {
            type: String,
        },
    },
    components: {
        FieldToCreate,
    },
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await this.FETCH_COMPANIES_RELATION(this.relations)
        })
    },
    mixins: [ContactsMixin, LoginMixin],
    computed: {
        ...mapGetters(['company', 'navBar', 'companyDetails']),
        showCompanies: {
            get() {
                return this.companyDetails[this.id].types
            },
            set() {},
        },
        relations() {
            return [
                this.companyDetails.divisions,
                this.companyDetails.departments,
                this.companyDetails.groups,
            ]
        },
    },
    methods: {
        ...mapActions([
            'SHOW_DIALOG',
            'SHOW_MESSAGE',
            'FETCH_COMPANIES_RELATION',
            'DELETE_COMPANY',
            'FIND_COMPANY_RELATION',
            'DELETE_COMPANY_RELATION',
            'CHECK_IF_IS_RELATION',
        ]),
        async edit(find) {
            this.tryCatchForAPIAction(async () => {
                await this.FIND_COMPANY_RELATION(find)
                this.SHOW_DIALOG('add-relationship')
            })
        },
        async deleting(find) {
            this.tryCatchForAPIAction(async () => {
                await this.CHECK_IF_IS_RELATION({
                    id: find[this.companyDetails[this.id].id].id,
                    collectionName: this.id,
                })
                if (this.company.relation.length) {
                    this.SHOW_MESSAGE({
                        title: `Negalite ištrinti ${
                            this.navBar[this.id].whose
                        } duomenis`,
                        content:
                            `${this.navBar[this.id].title} "${
                                find.name
                            }" turi rysius :<br>` +
                            this.company.relation.join('<br>'),
                        isAlert: true,
                    })
                    this.$store.commit('REMOVE_COMPANY')
                } else {
                    this.SHOW_MESSAGE({
                        title: 'Ar tikrai norite ištrinti struktūrą?',
                        content: `Pavadinimu: ${find.name}`,
                        action: async () => {
                            this.tryCatchForAPIAction(async () => {
                                await this.FIND_COMPANY_RELATION(find)
                                await this.DELETE_COMPANY_RELATION()

                                try {
                                    let { collectionName, id } =
                                        this.company.name
                                    await this.DELETE_COMPANY({
                                        collectionName,
                                        id,
                                    })
                                } catch {}
                                this.$store.commit('REMOVE_COMPANY')
                                await this.FETCH_COMPANIES_RELATION([
                                    this.companyDetails[this.id],
                                ])
                            })
                        },
                        cancelAction: () => {},
                    })
                }
            })
        },
    },
}
</script>
