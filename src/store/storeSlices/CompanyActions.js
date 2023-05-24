import { CompanyState } from "../initState/CompanyState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: CompanyState,
    mutations: {
        setName(state, name) {
            state.company.name = name
        },
        setId(state, { id, name }) {
            state.company.id = id
            state.company.name = name
        },
        setCompanies(state, { list, entity }) {
            state.details[entity].all = list
        },
        selectCompany(state, { select, id }) {
            state.details[id].selected = select
        }
    },
    actions: {
        addCompanyName({ commit }, name) {
            commit("setName", name)
        },
        async findCompany({ commit }, { id, entity }) {
            const data = await pocketBase
                .collection(entity)
                .getFirstListItem(`id="${id}"`);
            commit("setId", data)

        },
        async saveCompany({ state }, entity) {
            await pocketBase.collection(entity).create({ name: state.company.name })
        },
        async fetchCompanies({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created', });
            commit('setCompanies', { list, entity })
        },
        async editCompany({ state }, entity) {
            await pocketBase
                .collection(entity)
                .update(state.company.id, { name: state.company.name });
        },
        async deleteCompany({ commit, state }, entity) {
            await pocketBase
                .collection(entity)
                .delete(state.company.id)
            commit("setId", { id: null, name: '' })
        },

    },
    getters: {
        company: (state) => state.company,
        companyList: (state) => state.details.companies.all,
        companyDetails: (state) => state.details

    },
}