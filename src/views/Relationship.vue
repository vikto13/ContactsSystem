<template>
    <div>
        <slot></slot>
        <div class="m-5">
            <h1 style="font-weight: normal">{{ navBar.relationship.title }}</h1>
            <field-to-create
                v-show="havePermission('edit_structure')"
                :text="'Pridėti naują struktūrą'"
                @pressed="triggerDialog('add-relationship')"
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
        await this.fetchAllCompaniesRelation(this.relations)
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
            'triggerDialog',
            'triggerMessage',
            'fetchAllCompaniesRelation',
            'deleteCompany',
            'findCompanyRelation',
            'deleteCompanyRelation',
            'checkIfIsRelation',
        ]),
        async edit(find) {
            await this.findCompanyRelation(find)
            this.triggerDialog('add-relationship')
        },
        async deleting(find) {
            console.log(find)
            //     await this.checkIfIsRelation({ id, collectionName: 'offices' })
            // console.log(this.compa)

            // if (this.company.relation.length) {
            //     this.triggerMessage({
            //         title: 'Negalite ištrinti ofiso duomenis',
            //         content:
            //             `Ofisas ${this.office.name} turi rysius :<br>` +
            //             this.company.relation.join('<br>'),
            //         isAlert: true,
            //     })

            // this.triggerMessage({
            //     title: 'Ar tikrai norite ištrinti struktūrą?',
            //     content: `Pavadinimu: ${find.name}`,
            //     action: async () => {
            //         this.tryCatchForAPIAction(async () => {
            //             await this.findCompanyRelation(find)
            //             await this.deleteCompanyRelation()

            //             try {
            //                 let { collectionName, id } = this.company.name
            //                 await this.deleteCompany({ collectionName, id })
            //             } catch {}
            //             this.$store.commit('clearCompanyData')
            //             await this.fetchAllCompaniesRelation()
            //         })
            //     },
            //     cancelAction: () => {},
            // })
        },
    },
}
</script>
