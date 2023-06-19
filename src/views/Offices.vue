<template>
    <div>
        <slot></slot>
        <div class="m-5">
            <h1 style="font-weight: normal">{{ navBar.offices.title }}</h1>
            <field-to-create
                v-show="havePermission('edit_offices')"
                :text="navBar.offices.textAdd"
                @pressed="SHOW_DIALOG('add-office')"
            >
            </field-to-create>
            <md-table
                v-if="offices != null && offices.length"
                v-model="offices"
                md-sort="name"
                md-card
                md-fixed-header
                class="mt-5 table-footer"
            >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Pavadinimas" md-sort-by="name">
                        {{ item.name }}
                    </md-table-cell>
                    <md-table-cell md-label="Gatvė" md-sort-by="street">{{
                        ` ${item.street} ${item.street_number}`
                    }}</md-table-cell>
                    <md-table-cell md-label="Miestas" md-sort-by="city">{{
                        item.city
                    }}</md-table-cell>
                    <md-table-cell md-label="Šalis" md-sort-by="country">{{
                        item.country
                    }}</md-table-cell>

                    <md-table-cell md-label="Veiksmas">
                        <md-button
                            v-show="havePermission('edit_offices')"
                            class="md-dense md-raised md-primary edit-btn table-btn m-1 w-50"
                            @click="() => edit(item.id)"
                            >Redaguoti</md-button
                        >
                        <md-button
                            v-show="havePermission('delete_offices')"
                            class="md-dense md-raised md-primary delete-btn table-btn m-1 w-25"
                            @click="() => deleting(item.id)"
                            >Ištrinti</md-button
                        >
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <h5 v-else-if="offices != null" style="text-align: center">
                {{ navBar.offices.textEmpty }}
            </h5>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FieldToCreate from '../components/fields/FieldToCreate.vue'
import { LoginMixin } from './mixins/LoginMixin'
export default {
    components: {
        FieldToCreate,
    },
    mixins: [LoginMixin],
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await this.FETCH_OFFICES()
            await this.FETCH_ALL_COMPANIES()
        })
    },
    computed: {
        ...mapGetters(['office', 'navBar', 'company']),
        offices: {
            get() {
                return this.$store.getters.offices
            },
            set() {},
        },
    },

    methods: {
        ...mapActions([
            'SHOW_DIALOG',
            'FETCH_OFFICES',
            'SHOW_MESSAGE',
            'FIND_OFFICE',
            'DELETE_OFFICE',
            'FETCH_ALL_COMPANIES',
            'CHECK_IF_IS_RELATION',
        ]),
        async edit(id) {
            this.tryCatchForAPIAction(async () => {
                await this.FIND_OFFICE(id)
                this.SHOW_DIALOG('add-office')
            })
        },
        async deleting(id) {
            this.tryCatchForAPIAction(async () => {
                await this.FIND_OFFICE(id)
                await this.CHECK_IF_IS_RELATION({
                    id,
                    collectionName: 'offices',
                })

                if (this.company.relation.length) {
                    this.SHOW_MESSAGE({
                        title: 'Negalite ištrinti ofiso duomenis',
                        content:
                            `Ofisas ${this.office.name} turi rysius :<br>` +
                            this.company.relation.join('<br>'),
                        isAlert: true,
                    })
                    this.$store.commit('REMOVE_OFFICE')
                } else {
                    this.SHOW_MESSAGE({
                        title: 'Ar tikrai norite ištrinti ofiso duomenis?',
                        content: `Ofisas yra: ${this.office.country}, ${this.office.city}, ${this.office.street} ${this.office.street_number}`,
                        action: async () => {
                            await this.DELETE_OFFICE()
                            this.$store.commit('REMOVE_OFFICE')
                            await this.FETCH_OFFICES()
                        },
                        cancelAction: () => {
                            this.$store.commit('REMOVE_OFFICE')
                        },
                    })
                }
            })
        },
    },
}
</script>
