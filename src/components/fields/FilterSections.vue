<template>
    <div class="md-layout md-gutter md-alignment-center mt-4">
        <divide-components
            v-for="(filter, index) in filterCategories"
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
        filterCategories() {
            return [
                this.companyDetails.companies,
                this.companyDetails.offices,
                this.companyDetails.divisions,
                this.companyDetails.departments,
                this.companyDetails.groups,
            ]
        },
    },
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await Promise.all(
                this.filterCategories.map(({ name }) =>
                    this.FETCH_COMPANIES(name)
                )
            )
        })
    },
    methods: {
        ...mapActions([
            'FETCH_COMPANIES',
            'SEARCH_CONTACT_BY_SELECTIONS',
            'SEARCH_CONTACT_BY_TEXT',
            'FETCH_COMPANY_RELATION',
        ]),
        rearrangeArray(arr, selectedValue) {
            const index = arr.indexOf(selectedValue)
            const beforeSelected = arr.slice(0, index)
            const afterSelected = arr.slice(index + 1, selectedValue.length - 1)

            beforeSelected.reverse()
            return [...beforeSelected, ...afterSelected]
        },
        async selectOption({ value, id }) {
            this.$store.commit('SET_TO_SELECT_COMPANY', {
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
            this.tryCatchForAPIAction(async () => {
                await this.FETCH_COMPANY_RELATION(reranged)
                await this.SEARCH_CONTACT_BY_SELECTIONS()
                await this.SEARCH_CONTACT_BY_TEXT()
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
