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
        async findCompanyRelation({ state, commit }, value) {

            console.log(value)
            let data = await pocketBase.collection(value.collectionName).getFirstListItem(`id="${value.id}"`);

            let find = value.collectionName.split("_")
            // console.log(data)
            console.log(find, "----")
            console.log(state.details[find[0]], "*******")

            let departament = data[state.details[find[1]].id]
            let group = data[state.details[find[0]].id]

            console.log(departament, group)
            let b = {
                name: departament,
                id: data.id,
                collectionName: find[0],
                relation: data[state.details[find[1]].id]
            }
            // console.log(b)
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
                commit('setType', { list: add, entity: name })
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
            let all = [state.details.departments, state.details.divisions, state.details.groups, state.details.offices
            ].map(({ types }) => types)
            console.log(all)
            return [].concat(...all);
        },
    },
}