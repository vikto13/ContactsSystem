<template>
    <div class="md-layout md-gutter md-alignment-center mt-4">
        <divide-components
            v-for="(filter, index) in [
                companyDetails.companies,
                companyDetails.divisions,
                companyDetails.departments,
                companyDetails.groups,
                companyDetails.offices,
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
                        selectOption({ value: target.value, id: filter.name })
                "
            >
                <option
                    :disabled="'' == filter.selected"
                    selected
                    :value="null"
                >
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
import DivideComponents from './DivideComponents.vue'
import { LoginMixin } from '../views/mixins/LoginMixin'
export default {
    components: {
        DivideComponents,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['companyDetails', 'alert', 'navBar']),
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
            'showAlert',
            'searchContactBySelections',
            'searchContactByText',
            'disableAlert',
            'fetchCompanyRelation',
            'selectEmptyRelation',
        ]),
        rearrangeArray(arr, selectedValue) {
            const index = arr.indexOf(selectedValue)
            const beforeSelected = arr.slice(0, index)
            const afterSelected = arr.slice(index + 1)
            beforeSelected.reverse()
            return [
                ...beforeSelected.map((value) => ({
                    value,
                    toTop: false,
                })),
                ...afterSelected.map((value) => ({
                    value,
                    toTop: true,
                })),
            ]
        },
        async pressed(select, id) {
            let value = [
                'companies',
                'offices',
                'divisions',
                'departments',
                'groups',
            ]

            this.fetchCompanyRelation(this.rearrangeArray(value, id))
            this.tryCatchForAPIAction(async () => {
                await this.searchContactBySelections()
                await this.searchContactByText()
            })
        },
        async selectOption({ value, id }) {
            await this.$store.commit('selectCompany', {
                select: value,
                id,
            })
            if (value) {
                this.selectEmptyRelation(id)
            }

            // this.companyDetails[this.filter.name].selected != target.value &&
            // this.pressed(value, id)
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
