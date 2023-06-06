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
        },
        setType(state, { list, entity }) {
            state.details[entity].types = list
        },
        addRelations(state, { who, index, list }) {
            state.details[who].relations[index].relation = list
        },
        addComanyState(state, values) {
            for (let value in values) {
                state.company[value] = values[value]
            }
        }
    },
    actions: {
        async findCompany({ commit }, { id, entity }) {

            const data = await pocketBase
                .collection(entity)
                .getFirstListItem(`id="${id}"`);
            commit("setCompany", data)
        },
        async findCompanyRelation({ state, commit }, value) {
            let data = await pocketBase.collection(value.collectionName).getFirstListItem(`id="${value.id}"`);
            let tables = value.collectionName.split("_")
            let generated = {
                name: data[state.details[tables[1]].id],
                id: data.id,
                collectionName: tables[1],
                relation: data[state.details[tables[0]].id]
            }
            commit('setCompany', generated)
        },
        async saveCompany({ state }, entity) {
            await pocketBase.collection(entity).create({ name: state.company.name })
        },
        async saveCompanyRelation({ state }) {
            let { collectionName } = state.company
            let { relationship, id } = state.details[collectionName]
            await pocketBase.collection(`${relationship}_${collectionName}`).create({ [id]: state.company.name, [state.details[relationship].id]: state.company.relation })
        },
        async fetchCompanies({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created' });
            commit('setCompanies', { list, entity })
        },
        async fetchAllCompaniesRelation({ commit, state, getters }) {
            let search = [state.details.departments, state.details.divisions, state.details.groups, state.details.offices];

            let fetched = await Promise.all(search.map(({ id, name, relationship }) => {
                return pocketBase.collection(`${relationship}_${name}`).getFullList({
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
            let search = [state.details.groups, state.details.departments, state.details.offices, state.details.divisions, state.details.companies];
            let fetched = await Promise.all(search.map(({ name }) => {
                return pocketBase.collection(name).getFullList()
            }))
            fetched.map((list, index) => {
                commit('setCompanies', { list, entity: search[index].name })
            })

        },
        async editCompany({ state }, entity) {
            await pocketBase
                .collection(entity)
                .update(state.company.id, { name: state.company.name });
        },
        async editCompanyRelation({ state }) {
            let { relationship, id } = state.details[state.company.collectionName]
            await pocketBase
                .collection(`${relationship}_${state.company.collectionName}`)
                .update(state.company.id, { [id]: state.company.name, [state.details[relationship].id]: state.company.relation });
        },
        async deleteCompany({ state }, info) {
            let { id, collectionName } = state.company
            if (info) {
                collectionName = info.collectionName
                id = info.id
            }
            await pocketBase
                .collection(collectionName)
                .delete(id)
        },
        async checkIfIsRelation({ state, commit, getters }, { collectionName, id }) {
            const data = await Promise.all(state.details[collectionName].relations.map((table) => {
                return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${collectionName}/records/${id}?expand=${table.path}`)
            }))
            data.map(({ data }, index) => {
                if (data.expand) {
                    let list = data.expand[state.details[collectionName].relations[index].path]
                    commit("addRelations", { list, index, who: collectionName })
                    return;
                }
                commit("addRelations", { list: [], index, who: collectionName })
            })

            let relation = state.details[collectionName].relations.reduce((prev, curr) => {
                if (curr.relation.length) {
                    let relation = curr.relation[0].collectionName.split('_').map((relation) => getters.navBar[relation].title).join(" -> ")
                    return [...prev, relation]
                }
                return prev
            }, [])
            commit('addComanyState', { relation })
        }
    },
    getters: {
        company: (state) => state.company,
        companyList: (state) => state.details.companies.all,
        companyDetails: (state) => state.details,
        showCompaniesRealations: (state) => {
            let all = [state.details.departments, state.details.divisions, state.details.groups, state.details.offices
            ].map(({ types }) => types)
            return [].concat(...all);
        },
    },
}