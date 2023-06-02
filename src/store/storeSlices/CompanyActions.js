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
            console.log(company)
        },
        setType(state, { list, entity }) {
            state.details[entity].types = list
        }
    },
    actions: {
        async findCompany({ commit }, { id, entity }) {
            const data = await pocketBase
                .collection(entity)
                .getFirstListItem(`id="${id}"`);
            console.log(data)
            commit("setCompany", data)
        },
        async findCompanyRelation({ state, commit }, { id, collectionName }) {

            let data = await pocketBase.collection(collectionName).getFirstListItem(`id="${id}"`);

            let find = collectionName.split("_")
            console.log(data)

            console.log(state.details[find[0]])
            console.log(data[state.details[find[1]].id])
            let b = {
                name: data[state.details[find[1]].id],
                id: data.id,
                collectionName: collectionName.split("_")[1],
                relation: data[state.details[find[0]].id]
            }
            console.log(b)
            commit('setCompany', b)

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
        async fetchAllCompaniesRelation({ commit, state, getters }) {
            let search = [state.details.departments, state.details.divisions, state.details.companies, state.details.offices];
            let fetched = await Promise.all(search.map(({ id, name, relationship }) => {
                return pocketBase.collection(`${name}_${relationship}`).getFullList({
                    expand: `${state.details[name].id},${state.details[relationship].id}`
                })
            }))
            fetched.map((value, index) => {
                let add = value.map((record) => {
                    let temp = record
                    for (let expanded in record.expand) {
                        temp[expanded] = record.expand[expanded]
                    }
                    return temp
                })
                let { name } = search[index]
                commit('setCompanies', { list: add, entity: name })
            })

        },
        async fetchAllCompanies({ state, commit }) {
            let search = [state.details.groups, state.details.departments];
            let fetched = await Promise.all(search.map(({ relationship }) => {
                return pocketBase.collection(relationship).getFullList()
            }))
            fetched.map((list, index) => {
                commit('setType', { list, entity: search[index].relationship })
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
            let all = [state.details.departments, state.details.divisions, state.details.companies, state.details.offices
            ].map(({ all }) => all).filter((item) => item !== null);
            return [].concat(...all);
        },
    },
}