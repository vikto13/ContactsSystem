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
            state.company.name = id ? state.companies.find((value) => id == value.id).name : ''
        },
        setCompanies(state, list) {
            state.companies = list
        }
    },
    actions: {
        addCompanyName({ commit }, name) {
            commit("setName", name)
        },
        putCompany({ commit }, id) {
            commit("setId", id)
        },
        async saveCompany({ state }) {
            await pocketBase.collection("companies").create({ name: state.company.name })
        },
        async fetchCompanies({ commit }) {
            let allCompanies = await pocketBase.collection("companies").getFullList({ sort: '-created', });
            commit('setCompanies', allCompanies)
        },
        async editCompany({ state }) {
            await pocketBase
                .collection("companies")
                .update(state.company.id, { name: state.company.name });
        },
        async deleteCompany({ commit, state }) {
            await pocketBase
                .collection("companies")
                .delete(state.company.id)
            commit("setId", null)
        }
    },
    getters: {
        company: (state) => state.company,
        companyList: (state) => state.companies
    },
}