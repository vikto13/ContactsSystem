import { CompanyState } from "../initState/CompanyState"
import { pocketBase } from "../../../services/pocketBase";
import axios from "axios";
import { expanding, expandTheLast } from "./expandAction";
import { filterSameId, findObjectWithSameId, getWithSameId } from "./filterAction"

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
            let tables = value.collectionName.split("_")
            let { id } = state.details[tables[1]]
            let data = await pocketBase.collection(value.collectionName).getFullList(
                {
                    filter: `${id}='${value[id].id}'`,
                    '$autoCancel': false
                }
            );
            let generated = {
                name: value[state.details[tables[1]].id],
                id: data.map((data) => ({
                    relation: data[state.details[tables[0]].id],
                    id: data.id
                })),
                collectionName: tables[1],
                relation: data.map((data) => data[state.details[tables[0]].id]),
                table: value.collectionName
            }
            commit('setCompany', generated)
        },
        async saveCompany({ state }, entity) {
            await pocketBase.collection(entity).create({ name: state.company.name })
        },
        async saveCompanyRelation({ state, getters }) {
            let { collectionName, name, relation } = state.company
            let { relationship, id } = state.details[collectionName]
            let data = await pocketBase.collection(`${collectionName}`).create({ name })

            await Promise.all(relation.map(async (relId) => {
                return axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${relationship}_${collectionName}/records`,
                    { [id]: data.id, [state.details[relationship].id]: relId },
                    {
                        headers: {
                            Authorization: `Bearer ${getters.user.token}`
                        }
                    }
                )
            }))

        },
        async fetchCompanies({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created' });
            commit('setCompanies', { list, entity })
        },
        async setCompaniesInType({ commit }, entity) {
            let list = await pocketBase.collection(entity).getFullList({ sort: '-created' });
            commit('setType', { list, entity })
        },
        async fetchAllCompaniesRelation({ commit, state, getters }, search) {

            let fetched = await Promise.all(search.map(async ({ id, name, relationship }) => {
                let data = await pocketBase.collection(`${relationship}_${name}`).getFullList({
                    expand: `${state.details[name].id},${state.details[relationship].id}`,
                    sort: '-created',
                })
                return data
            }))
            fetched.map((value, index) => {
                let add = value.map((record) => {
                    let temp = record
                    for (let expanded in record.expand) {
                        temp[expanded] = record.expand[expanded]
                    }
                    return temp
                })
                let results = add.reduce((prev, curr) => {
                    let { name } = curr[search[index].id]
                    prev[curr[search[index].id].id] = {
                        ...curr,
                        name
                    }
                    return prev
                }, {})
                let { name } = search[index]
                commit('setType', { list: Object.values(results), entity: name })
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
        async setCompanyRealation({ commit, state, getters, dispatch }, values) {
            if (!values.length) {
                return;
            }
            let { name } = values[0]
            const { fetchFrom, relationship } = state.details[name]
            let selected = getters.employee[state.details[fetchFrom[1].table].id]
            if (selected) {
                let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${fetchFrom[1].table}/records/${selected}?expand=${fetchFrom[1].path}`)
                commit("setType", { list: data.expand ? expandTheLast(data) : [], entity: name })
            } else {
                let { table, path } = fetchFrom[1]
                let fetched = await Promise.all(state.details[table].types.map(({ id }) => {
                    return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${id}?expand=${path}`)
                }))
                commit("setType", { list: reduceArray(fetched), entity: name })
            }
            dispatch("setCompanyRealation", values.slice(1, values.length))

        },
        async fetchCompanyRelation({ state, commit, dispatch }, value) {

            if (value.length) {
                let search = state.details[value[0]]
                let { fetchFrom, name } = search;
                const results = []
                for (const { table, path } of fetchFrom) {

                    if (state.details[table].selected) {
                        let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${state.details[table].selected}?expand=${path}`)
                        let list = data.expand ? expandTheLast(data) : []
                        if (fetchFrom.filter(({ table }) => state.details[table].selected).length != fetchFrom.length) {
                            await commit('setCompanies', { list, entity: name })
                            return dispatch("fetchCompanyRelation", value.slice(1, value.length))
                        } else {

                            results.push(list)
                        }
                    }
                    else {
                        let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records?expand=${path}`)
                        results.push(reduceArr(data.items))
                    }
                }
                await commit('setCompanies', { list: results.length == 2 ? getWithSameId(results[0], results[1]) : results[0], entity: name })
                await dispatch("fetchCompanyRelation", value.slice(1, value.length))
            }

        },
        async editCompany({ state, commit }, entity) {
            await pocketBase
                .collection(entity)
                .update(state.company.id, { name: state.company.name });
        },
        async editCompanyRelation({ state, commit, dispatch, getters }) {

            let { collectionName, id, name } = state.company.name
            let data = await pocketBase
                .collection(collectionName).update(id, { name })
            await Promise.all(state.company.relation.filter((value) => {
                return !state.company.id.some(obj => obj.relation == value)
            }).map(id => {
                return axios.post(
                    `${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${state.details[state.company.collectionName].relationship}_${state.company.collectionName}/records`,
                    {
                        [state.details[state.details[state.company.collectionName].relationship].id]: id,
                        [state.details[state.company.collectionName].id]: data.id

                    }, {
                    headers: {
                        Authorization: `Bearer ${getters.user.token}`
                    }
                }

                )
            }))
            await Promise.all(state.company.id.filter(({ relation }) => !state.company.relation.some(id => id == relation)).map((relation) => {
                return pocketBase.collection(state.company.table).delete(relation.id)
            }))
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
        async deleteCompanyRelation({ state }) {
            await Promise.all(state.company.id.map(({ id }) => {
                return pocketBase.collection(`${state.details[state.company.collectionName].relationship}_${state.company.collectionName}`).delete(id, {
                    '$autoCancel': false
                })
            }))
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

function reduceArray(fetched) {
    let show = fetched.reduce((prev, curr) => {
        if (curr.data.expand) {
            expandTheLast(curr.data).map(val => {
                prev[val.id] = val
            })
        }
        return prev
    }, {})
    return show ? Object.values(show) : []
}

function reduceArr(fetched) {
    let show = fetched.reduce((prev, curr) => {
        if (curr.expand) {
            expandTheLast(curr).map(val => {
                prev[val.id] = val
            })
        }
        return prev
    }, {})
    return show ? Object.values(show) : []
}