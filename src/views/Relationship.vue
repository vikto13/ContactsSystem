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
            <md-table
                v-if="showCompanies.length"
                v-model="showCompanies"
                md-card
                md-sort="created"
                md-sort-order="asc"
                md-fixed-header
                class="mt-5 table-footer"
            >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Pavadinimas" md-sort-by="name">
                        {{ item.name }}
                    </md-table-cell>
                    <md-table-cell md-label="Tipas" md-sort-by="type">{{
                        item.type
                    }}</md-table-cell>
                    <md-table-cell md-label="Veiksmas">
                        <md-button
                            v-show="havePermission('edit_structure')"
                            class="md-dense md-raised md-primary edit-btn"
                            @click="() => edit(item)"
                            >Redaguoti</md-button
                        >
                        <md-button
                            v-show="havePermission('delete_structure')"
                            class="md-dense md-raised md-primary delete-btn"
                            @click="() => deleting(item)"
                            >Ištrinti</md-button
                        >
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <h5 v-else class="text-center">
                {{ navBar.relationship.textEmpty }}
            </h5>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FieldToCreate from '../components/fields/FieldToCreate.vue'
import { ContactsMixin } from './mixins/ContactsMixin'
import { LoginMixin } from './mixins/LoginMixin'
export default {
    components: {
        FieldToCreate,
    },
    async mounted() {
        await this.fetchAllCompaniesRelation()
    },
    mixins: [ContactsMixin, LoginMixin],
    computed: {
        ...mapGetters([
            'companyDetails',
            'company',
            'showCompaniesRealations',
            'navBar',
        ]),
        showCompanies: {
            get() {
                return this.showCompaniesRealations
            },
            set() {},
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
        ]),
        async edit(find) {
            await this.findCompanyRelation(find)
            this.triggerDialog('add-relationship')
        },
        async deleting(find) {
            this.triggerMessage({
                title: 'Ar tikrai norite ištrinti struktūrą?',
                content: `Pavadinimu: ${find.name}`,
                action: async () => {
                    this.tryCatchForAPIAction(async () => {
                        await this.findCompanyRelation(find)
                        await this.deleteCompanyRelation()

                        try {
                            let { collectionName, id } = this.company.name
                            await this.deleteCompany({ collectionName, id })
                        } catch {}
                        this.$store.commit('clearCompanyData')
                        await this.fetchAllCompaniesRelation()
                    })
                },
                cancelAction: () => {},
            })
        },
    },
}
</script>
