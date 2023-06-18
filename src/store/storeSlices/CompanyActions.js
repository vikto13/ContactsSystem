import { CompanyState } from "../initState/CompanyState"
import { expandValues } from "./expandAction";
import { getWithSameId } from "./filterAction"

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
            let data = await this.getFirstList(entity, id)
            commit("setCompany", data)
        },
        async findCompanyRelation({ state, commit }, value) {
            let tables = value.collectionName.split("_")
            let { id } = state.details[tables[1]]
            let data = await this.getFullList(value.collectionName, {
                filter: `${id}='${value[id].id}'`,
            })
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
            await this.saveRecord(entity, { name: state.company.name })
        },
        async saveCompanyRelation({ state }) {
            let { collectionName, name, relation } = state.company
            let { relationship, id } = state.details[collectionName]
            console.log(collectionName, { name })
            let data = await this.saveRecord(collectionName, { name })
            await Promise.all(relation.map((relId) => {
                return this.saveRecords(`${relationship}_${collectionName}`,
                    { [id]: data.id, [state.details[relationship].id]: relId }
                )
            }))


        },
        async fetchCompanies({ commit }, entity) {
            let list = await this.getFullList(entity);
            commit('setCompanies', { list, entity })
        },
        async setCompaniesInType({ commit }, entity) {
            let list = await this.getFullList(entity);
            commit('setType', { list, entity })
        },
        async fetchAllCompaniesRelation({ commit, state }, search) {
            let fetched = await Promise.all(search.map(async ({ name, relationship }) => {
                let data = await this.getFullList(`${relationship}_${name}`, { expand: `${state.details[name].id},${state.details[relationship].id}` })
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
            let fetched = await Promise.all(search.map(({ name }) => this.getFullList(name)))
            fetched.map((list, index) => {
                commit('setCompanies', { list, entity: search[index].name })
            })
        },
        async setCompanyRealation({ commit, state, getters, dispatch }, values) {

            if (!values.length) {
                return;
            }
            let { name } = values[0]
            console.log(name)
            const { fetchFrom } = state.details[name]
            let selected = getters.employee[state.details[fetchFrom[1].table].id]
            if (selected) {
                let data = await this.getList(fetchFrom[1].table, selected, fetchFrom[1].path)
                console.log(expandValues(data.items), "/*/*/*/*/")
                commit("setType", { list: expandValues(data.items), entity: name })
            } else {
                let { table, path } = fetchFrom[1]
                let fetched = await Promise.all(state.details[table].types.map(({ id }) => {
                    return this.getList(table, id, path)
                }))

                commit("setType", { list: reduceArrays(fetched), entity: name })
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
                        let data = await this.getList(table, state.details[table].selected, path)
                        let list = expandValues(data.items, value[0])
                        if (fetchFrom.filter(({ table }) => state.details[table].selected).length != fetchFrom.length) {
                            await commit('setCompanies', { list, entity: name })
                            return dispatch("fetchCompanyRelation", value.slice(1, value.length))
                        } else {
                            results.push(list)
                        }
                    }
                    else {
                        let data = await this.getFullList(table, { expand: path })
                        results.push(
                            reduceArrays([{ items: data }]))
                    }
                }
                await commit('setCompanies', { list: results.length == 2 ? getWithSameId(results[0], results[1]) : results[0], entity: name })
                await dispatch("fetchCompanyRelation", value.slice(1, value.length))
            }

        },
        async editCompany({ state }, entity) {
            await this.updateRecord(entity, state.company.id, { name: state.company.name })
        },
        async editCompanyRelation({ state, getters }) {
            let { collectionName, id, name } = state.company.name
            let data = await this.updateRecord(collectionName, id, { name })
            const { relation, id: relId, collectionName: coll } = state.company
            await Promise.all(relation.filter((value) => !relId.some(obj => obj.relation == value))
                .map(id => {
                    let { relationship, id: relatId } = state.details[coll]
                    return this.saveRecord(`${relationship}_${coll}`,
                        {
                            [state.details[relationship].id]: id,
                            [relatId]: data.id

                        }
                    )
                }))
        },
        async deleteCompany({ state }, info) {
            let { id, collectionName } = state.company
            if (info) {
                collectionName = info.collectionName
                id = info.id
            }
            await this.deleteRecord(collectionName, id)
        },
        async deleteCompanyRelation({ state }) {
            await Promise.all(state.company.id.map(({ id }) => {
                let { collectionName } = state.company
                let { relationship } = state.details[collectionName]
                return this.deleteRecord(`${relationship}_${collectionName}`, id)
            }))
        },
        async checkIfIsRelation({ state, commit, getters }, { collectionName, id }) {
            const datas = await Promise.all(state.details[collectionName].relations.map((table) => {
                return this.getList(collectionName, id, table.path)
            }))
            let relations = reduceArrays(datas).reduce((prev, curr) => {
                prev[curr.collectionName] = curr
                return prev
            }, {})

            let relation = Object.values(relations).map((rel) => rel.collectionName.split('_').map((relation) => getters.navBar[relation].title).join(" -> "))
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
function reduceArrays(fetched) {
    let show = fetched.flatMap(({ items }) => items).reduce((prev, curr) => {
        if (Object.keys(curr.expand).length) {
            expandValues(curr).map((value) => {
                prev[value.id] = value
            })
        }
        return prev
    }, {})
    return show ? Object.values(show) : []
}