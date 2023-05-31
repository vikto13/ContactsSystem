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
            console.log(select, id)
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
            console.log(data)
            commit("setCompany", { ...data, relation: data[state.details[entity].relationship] })
        },
        async saveCompany({ state }, entity) {
            await pocketBase.collection(entity).create({ name: state.company.name })
        },
        async saveCompanyRelation({ state }) {
            let { collectionName } = state.company
            let { relationship } = state.details[collectionName]
            await pocketBase.collection(collectionName).create({ name: state.company.name, [relationship]: state.company.relation })
        },
        async fetchCompanies({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created' });
            commit('setCompanies', { list, entity })
        },
        async fetchAllCompanies({ commit, state, getters }) {
            let search = [state.details.departments, state.details.divisions, state.details.groups, state.details.companies]

            let list = await Promise.all(search.map(({ id }) => {
                return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${id}/records`,
                    { headers: { Authorization: `Bearer ${getters.user.token}` } }
                )
            }))
            search.map(({ id }, index) => {
                let { items } = list[index].data
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
        async getOfficesAddress({ commit, getters, dispatch }) {
            await dispatch("fetchOffices");

            let address = getters.offices.lenght ? getters.offices.map(({ street, street_number, city, country, expand }) => {
                return ({
                    name: `${country}, ${city}, ${street} ${street_number}`,
                    id: expand.companies[0].id
                })
            }) : []

            commit('setCompanies', { list: address, entity: "office" })

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