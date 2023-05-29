import { CompanyState } from "../initState/CompanyState"
import { pocketBase } from "../../../services/pocketBase";
import axios from "axios";

export default {
    state: CompanyState(),
    mutations: {
        setCompany(state, data) {
            for (let value in state.company) {
                state.company[value] = data[value]
            }
        },
        setCompanies(state, { list, entity }) {
            state.details[entity].all = list
        },
        selectCompany(state, { select, id }) {
            state.details[id].selected = select
        },
        clearCompanyData(state) {
            let { company } = CompanyState()
            for (let value in state.company) {
                state.company[value] = company[value]
            }
        }
    },
    actions: {

        async findCompany({ commit, state }, { id, entity }) {
            const data = await pocketBase
                .collection(entity)
                .getFirstListItem(`id="${id}"`);

            commit("setCompany", { ...data, relation: data[state.details[entity].relationship] })

        },
        async saveCompany({ state }, entity) {
            await pocketBase.collection(entity).create({ name: state.company.name })
        },
        async saveCompanyRelation({ state }) {
            let { collectionName } = state.company
            let { relationship } = state.details[collectionName]
            console.log(collectionName, relationship)
            console.log(state.company)
            await pocketBase.collection(collectionName).create({ name: state.company.name, [relationship]: state.company.relation })
        },
        async fetchCompanies({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created', });
            commit('setCompanies', { list, entity })
        },
        async fetchAllCompanies({ commit, state }, entity) {
            let search = [state.details.departments, state.details.divisions, state.details.groups, state.details.companies]

            let list = await Promise.all(search.map(({ id }) => {
                return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${id}/records`)
            }))
            search.map(({ id }, index) => {
                let { items } = list[index].data
                console.log({ list: items, entity: id })
                commit('setCompanies', { list: items, entity: id })
            })

        },
        async editCompany({ state }, entity) {
            await pocketBase
                .collection(entity)
                .update(state.company.id, { name: state.company.name });
        },
        async deleteCompany({ commit, state }) {
            await pocketBase
                .collection(state.company.collectionName)
                .delete(state.company.id)

        },

    },
    getters: {
        company: (state) => state.company,
        companyList: (state) => state.details.companies.all,
        companyDetails: (state) => state.details,

        showCompaniesRealations: (state) => {
            let all = [state.details.departments,
            state.details.groups,
            state.details.divisions,
            ].map(({ all }) => all);
            return [].concat(...all);

        }
    },
}