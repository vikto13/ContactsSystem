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
            let tables = value.collectionName.split("_")
            let { id } = state.details[tables[1]]
            let data = await pocketBase.collection(value.collectionName).getFullList(
                { filter: `${id}='${value[id].id}'` }
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
        async fetchAllCompaniesRelation({ commit, state, getters }) {
            let search = [
                state.details.departments,
                state.details.divisions,
                state.details.groups,
                state.details.offices,
            ]
            let fetched = await Promise.all(search.map(({ id, name, relationship }) => {
                return pocketBase.collection(`${relationship}_${name}`).getFullList({
                    expand: `${state.details[name].id},${state.details[relationship].id}`,
                    sort: '-created',
                })
            }))

            fetched.map((value, index) => {
                let add = value.map((record) => {
                    let temp = record

                    for (let expanded in record.expand) {
                        temp[expanded] = record.expand[expanded]
                    }
                    let search = temp.collectionName.split('_')[1]
                    let { name } = record[getters.companyDetails[search].id]
                    return { ...temp, name, type: getters.navBar[search].title }
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
                console.log("not selected", name)
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
                let search = state.details[value[0].value]
                let { fetchFrom, name } = search;
                console.log(value[0].toTop)
                console.log(name, fetchFrom)
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
                    commit("setCompanies", { list: reduceArray(fetched), entity: name })

                }
                await dispatch("fetchCompanyRelation", value.slice(1, value.length))

            }


            // let data = await Promise.all(fetchFrom.map(({ table, path }) => {
            //     // console.log(table)
            //     // console.log('//////////', state.details[table].selected)
            //     //if is selected then getting values that are connected
            //     if (state.details[table].selected) {
            //         return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${state.details[table].selected}?expand=${path}`)
            //     } else {
            //         //getting if is come values with it, the match eatch other
            //         // console.log(state.details[table].all, value[0]) 

            //         return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${value[0]}/records`)
            //     }
            // }))
            // let searching = data.map(({ data }) => {
            //     return data.items ? data.items : expandTheLast(data)
            // })
            // // console.log(searching, "/*/*/")
            // //check iff match all

            // const list = searching.length == 1 ? searching[0] : getAllMatches(searching[0], searching[1])
            // console.log(state.details[fetchFrom[0].table].all, list)

            // // console.log(list, value[0])
            // if (value.length) {

            //     commit("setCompanies", { list, entity: value[0] })
            //     dispatch("fetchCompanyRelation", value.slice(1, value.length))
            // }
            // }
            // let { name, values, index } = value

            // let { table, path, relate } = state.details[name].fetching[index]

            // let data = await Promise.all(values.map(({ id }) => axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${table}/records/${id}?expand=${path}`)))
            // const combinedArray = data.map(({ data }) => data.expand ? expandTheLast(data) : [])
            //     .flatMap((arr) => arr)

            // if (state.details[name].fetching.length != index + 1) {

            // }

        },
        async selectEmptyRelation({ state, commit, dispatch }, selected) {

            if (!selected.length) {
                return;
            }
            let name = selected[0]
            const { fetchFrom, relationship } = state.details[name]

            if (state.details[relationship].selected) {
                console.log("is selected", name)
                let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${fetchFrom[fetchFrom.length - 1].table}/records/${state.details[relationship].selected}?expand=${fetchFrom[fetchFrom.length - 1].path}`)
                console.log(expandTheLast(data))
                await commit("setCompanies", { list: data.expand ? expandTheLast(data) : [], entity: name })
            } else {
                console.log("not selected", name)
                // console.log("not selected", name)
                // let { table, path } = fetchFrom[fetchFrom.length - 1]
                let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${name}/records?expand=${fetchFrom[fetchFrom.length - 1].path.split(".")[0]}`)
                console.log(data)
                await commit("setCompanies", { list: data.items, entity: name })
            }

            await dispatch("selectEmptyRelation", selected.slice(1, selected.length))
            // dispatch("setCompanyRealation", values.slice(1, values.length))
            //  // console.log(state.details[table].selected == null)
            //  if (state.details[table].selected == 1) {
            //     console.log(name)
            //     //console.log(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${relationship}/records/?expand=${relationship}_${name}`)
            //     console.log(await Promise.all(fetchFrom.map(({ path, table }) => {
            //         console.log(state.details[table], table)
            //         console.log(path)
            //         // return axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${name}/records/?expand=${relationship}_${name}`)
            //     })))

            // }
        },
        async editCompany({ state, commit }, entity) {
            await pocketBase
                .collection(entity)
                .update(state.company.id, { name: state.company.name });
        },
        async editCompanyRelation({ state, commit, dispatch }) {

            let { collectionName, id, name } = state.company.name
            console.log("aaaaaaaaaaaaaaaaaaaaaa")
            // await Promise.all(state.company.id.map((id) => {
            //     return pocketBase
            //         .collection(state.company.table).delete(id)
            // }))
            // state.company.relation.map(id => {
            //     // console.log(state.company.id.includes(id))
            //     console.log(
            //         state.company.id.some(obj => {
            //             obj.relation === d
            //         }))

            // })

            let data = await pocketBase
                .collection(collectionName).update(id, { name })
            state.company.relation.map((value) => {
                if (state.company.id.some(obj => obj.relation === value)) {
                    return;
                }
                else {
                    console.log("create it")
                }
            })
            Promise.all(state.company.id.filter(({ relation }) => !state.company.relation.some(id => id === relation)))
            throw null
            // let data = await pocketBase
            //     .collection(collectionName).create({ name })
            // await commit("setCompany", { ...state.company, name: data })
            // await dispatch("saveCompanyRelation")

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