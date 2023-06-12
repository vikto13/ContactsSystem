import { CompanyState } from "../initState/CompanyState"
import { pocketBase } from "../../../services/pocketBase";
import axios from "axios";
import { expanding, expandTheLast } from "./expandAction";
import { filterSameId, findObjectWithSameId } from "./filterAction"

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
        async setCompaniesInType({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created' });
            commit('setType', { list, entity })
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
        async fetchCompanyDetailsRelation({ state, commit, dispatch }, value) {
            console.log(value)
            // let { name, values, selected, index } = value
            // let data = await Promise.all(values.map(({ id }) => axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${selected}/records/${id}?expand=${state.details[name].fetching[index]}`)))
            // const combinedArray = data.map(({ data }) => data.expand ? expandTheLast(data) : [])
            //     .flatMap((arr) => arr)

            // if (state.details[name].fetching.length == index + 1) {
            //     commit('setType', { list: filterSameId(combinedArray), entity: name })
            // } else {
            //     dispatch("fetchCompanyRelation", { name, values: combinedArray, selected: state.details[name].relationship, index: index + 1 })
            // }
        },
        async fetchCompanyRelation({ state, commit, dispatch }, value) {
            if (value.length) {
                let search = state.details[value[0].value]
                let { all, fetchFrom, name } = search;
                let { path, table } = fetchFrom[value[0].toTop ? 1 : 0]
                if (state.details[table].selected) {
                    let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${state.details[table].selected}?expand=${path}`)

                    let list = data.expand ? expandTheLast(data) : []
                    await commit('setCompanies', { list, entity: name })
                }
                else {
                    let fetched = await Promise.all(state.details[table].all.map(({ id }) => {
                        return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${id}?expand=${path}`)
                    }))
                    console.log(fetched)
                    let show = fetched.reduce((prev, curr) => {
                        if (curr.data.expand) {
                            expandTheLast(curr.data).map(val => {
                                prev[val.id] = val
                            })
                        }
                        return prev
                    }, {})
                    await commit('setCompanies', { list: show ? Object.values(show) : [], entity: name })
                }

                dispatch("fetchCompanyRelation", value.slice(1, value.length))

            }
        },
        async selectEmptyRelation({ state, commit, dispatch }, relations) {
            if (relations.length) {
                const selected = relations[0]

                let fetched = []
                await Promise.all(state.details[selected].fetchFrom.map(async ({ table, path }) => {
                    if (state.details[table].selected) {
                        let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${state.details[table].selected}?expand=${path}`)
                        fetched.push(expandTheLast(data))

                    } else {

                        let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${selected}/records?expand=${path.split(".")[0]}`)
                        fetched.push(data.items)
                    }
                }))
                await commit('setCompanies', { list: fetched.length === 1 ? fetched[0] : getAllMatches(fetched[0], fetched[1]), entity: selected })
                dispatch("selectEmptyRelation", relations.slice(1, relations.length))
            }
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

function getAllMatches(arr, secArr) {
    return arr.filter(obj1 => secArr.some(obj2 => obj2.id === obj1.id))
}