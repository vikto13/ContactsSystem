<template>
    <div class="md-layout md-gutter md-alignment-center mt-4">
        <divide-components
            v-for="(filter, index) in [
                companyDetails.companies,
                companyDetails.offices,
                companyDetails.divisions,
                companyDetails.departments,
                companyDetails.groups,
            ]"
            :key="index"
        >
            <label class="form-label">{{ navBar[filter.name].title }}: </label>
            <select
                :v-model="filter.selected"
                class="form-select elipses"
                aria-label="Default select example"
                @click="
                    ({ target }) =>
                        target.value == companyDetails[filter.name].selected ||
                        selectOption({ value: target.value, id: filter.name })
                "
            >
                <option :disabled="'' == filter.selected" selected :value="''">
                    {{ navBar[filter.name].title }}
                </option>

                <option
                    v-for="(select, position) in filter.all"
                    :disabled="select.id == filter.selected"
                    :key="position"
                    :value="select.id"
                    :selected="select.id == filter.selected"
                >
                    {{ select.name }}
                </option>
            </select>
        </divide-components>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import DivideComponents from '../utils/DivideComponents.vue'
import { LoginMixin } from '../../views/mixins/LoginMixin'
export default {
    components: {
        DivideComponents,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['companyDetails', 'navBar']),
    },
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await Promise.all(
                [
                    this.companyDetails.companies,
                    this.companyDetails.departments,
                    this.companyDetails.divisions,
                    this.companyDetails.groups,
                    this.companyDetails.offices,
                ].map(({ name }) => this.fetchCompanies(name))
            )
        })
    },
    methods: {
        ...mapActions([
            'fetchCompanies',
            'selectCompany',
            'searchContactBySelections',
            'searchContactByText',
            'fetchCompanyRelation',
        ]),
        rearrangeArray(arr, selectedValue) {
            const index = arr.indexOf(selectedValue)
            const beforeSelected = arr.slice(0, index)
            const afterSelected = arr.slice(index + 1, selectedValue.length - 1)

            beforeSelected.reverse()
            return [...beforeSelected, ...afterSelected]
        },
        async selectOption({ value, id }) {
            this.$store.commit('selectCompany', {
                select: value,
                id,
            })
            let companiesInfo = [
                'companies',
                'offices',
                'divisions',
                'departments',
                'groups',
            ]

            let reranged = this.rearrangeArray(companiesInfo, id)
            this.fetchCompanyRelation(reranged)
            this.tryCatchForAPIAction(async () => {
                await this.searchContactBySelections()
                await this.searchContactByText()
            })
        },
    },
}
</script>

<style>
.elipses {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
