import { CompanyState } from "../initState/CompanyState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: CompanyState,
    mutations: {
        setName(state, name) {
            state.company.name = name
        },
        setId(state, id) {
            state.company.id = id
            // state.company.name = state.companies.filter((value) => id == value.id).name
            console.log(state.companies)
        },
        setCompanies(state, list) {
            state.companies = list
        }
    },
    actions: {
        addCompanyName({ commit }, name) {
            console.log(name)
            commit("setName", name)
        },
        async saveCompany({ state }) {
            await pocketBase.collection("companies").create({ name: state.company.name })
        },
        async fetchCompanies({ commit }) {
            let allCompanies = await pocketBase.collection("companies").getFullList({ sort: '-created', });
            commit('setCompanies', allCompanies)

        }
    },
    getters: {
        company: (state) => state.company,
        companyList: (state) => state.companies
    },
}