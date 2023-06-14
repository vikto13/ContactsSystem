<template>
    <div class="md-layout-item m-3">
        <h5 class="text-center mb-4" style="margin-top: 13%">
            Kompanijos detalės:
        </h5>
        <div v-for="(select, position) in showCompanies" :key="position">
            <input-box-icon
                v-show="
                    companyDetails[select.relation]
                        ? employee[companyDetails[select.relation].id]
                        : true
                "
                :bottom-text="`Pasirinkite ${navBar[select.name].what}:`"
                :title="`${navBar[select.name].title}:`"
                :is-not-valid="
                    isInvalid({ [select.id]: employee[select.id] }) &&
                    select.required
                "
                class="mt-2"
            >
                <select
                    v-model="employee[select.id]"
                    class="form-select"
                    @input="
                        (e) =>
                            position != showCompanies.length - 1 &&
                            selected({
                                value: e.target.value,
                                selected: select,
                                name: showCompanies[position + 1].name,
                            })
                    "
                >
                    <option
                        selected
                        :value="''"
                        :disabled="employee[select.id] == ''"
                    >
                        Pasirinkite {{ navBar[select.name].what }}
                    </option>
                    <option
                        v-for="option in select.types"
                        :key="option.id"
                        :value="option.id"
                        :disabled="employee[select.id] == option.id"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </input-box-icon>
        </div>
        <add-image></add-image>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AddImage from './fields/AddImage.vue'
import InputBoxIcon from './utils/InputBoxIcon.vue'
import { LoginMixin } from '../views/mixins/LoginMixin'
export default {
    components: {
        AddImage,
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    async mounted() {
        await Promise.all([
            this.setCompaniesInType('companies'),
            this.setCompaniesInType('offices'),
        ])
    },
    computed: {
        ...mapGetters(['companyDetails', 'employee', 'navBar']),
        companyDetails: {
            get() {
                return this.$store.state.Company.details
            },
        },
        showCompanies: {
            get() {
                return [
                    { ...this.companyDetails.companies, required: true },
                    { ...this.companyDetails.divisions, required: true },
                    { ...this.companyDetails.departments, required: false },
                    { ...this.companyDetails.groups, required: false },
                ]
            },
        },
    },
    methods: {
        ...mapActions(['setCompaniesInType', 'setCompanyRealation']),
        async selected({ selected, value, name }) {
            let index = this.showCompanies.findIndex(
                (obj) => obj.name === selected.name
            )
            let filteredArr = this.showCompanies.slice(
                index + 1,
                this.showCompanies.length
            )
            this.$store.commit('setEmployee', {
                ...filteredArr.reduce((prev, curr) => {
                    return { ...prev, [curr.id]: '' }
                }, {}),
                [selected.id]: value,
            })
            let show = []
            index == 0 && show.push({ name: 'offices' })

            this.setCompanyRealation([
                ...show,
                ...this.showCompanies.slice(index + 1, index + 2),
            ])
        },
    },
}
</script>
