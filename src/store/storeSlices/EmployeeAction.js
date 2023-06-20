import { EmployeeState } from '../initState/EmployeeState'
import { expanding, expandValues } from './expandAction'
import { findObjectWithSameId } from './filterAction'

export default {
    state: EmployeeState(),
    mutations: {
        SET_EMPLOYEE(state, employee) {
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        REMOVE_EMPLOYEE(state) {
            let { employee } = EmployeeState()
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        SET_EMPLOYEES(state, list) {
            state.employees = list
        },
        SET_FILTERED_EMPLOYEES(state, list) {
            state.filteredEmployees = list
        },
    },
    actions: {
        async FIND_EMPLOYEE({ commit, state, dispatch }, id) {
            let data = await this.getFirstList(state.collectionName, id)
            data.photo &&
                dispatch('GET_IMAGE_FROM_API', {
                    record: data,
                    fileName: data.photo,
                })
            commit('SET_EMPLOYEE', data)
        },
        async FIND_AND_EXPAND_EMPLOYEE({ commit, state }, id) {
            let data = await this.getFirstList(state.collectionName, id, {
                expand: 'department_id,company_id,division_id,office_id,group_id',
            })
            commit('SET_EMPLOYEE', expanding(data))
        },
        async POST_EMPLOYEE({ state, getters }) {
            await this.saveRecord(
                state.collectionName,
                generateEmployeeData(state, getters)
            )
        },
        async FETCH_EMPLOYEES({ commit, state }) {
            let data = await this.getFullList(state.collectionName, {
                expand: 'department_id,division_id,group_id,office_id,company_id',
            })
            await commit('SET_EMPLOYEES', data)
        },
        async EDIT_EMPLOYEE({ state, getters }) {
            this.updateRecord(
                state.collectionName,
                state.employee.id,
                generateEmployeeData(state, getters)
            )
        },
        async DELETE_EMPLOYEE({ state }) {
            await this.deleteRecord(state.collectionName, state.employee.id)
        },
        async SEARCH_CONTACT_BY_TEXT({ commit, state }) {
            let filteredItems = state.filteredEmployees
            if (state.contactSearch) {
                let filter = `filter=(email~'${state.contactSearch}'||name~'${state.contactSearch}'||phone_number~'${state.contactSearch}'||position~'${state.contactSearch}'||surname~'${state.contactSearch}')`
                let { items } = await this.getListByFilter(
                    state.collectionName,
                    filter,
                    'office_id'
                )
                filteredItems = items.filter((employee) =>
                    filteredItems.some(
                        (obj2) => obj2.id === expanding(employee).id
                    )
                )
            }
            commit('SET_EMPLOYEES', filteredItems)
        },
        async SEARCH_CONTACT_BY_SELECTIONS({
            commit,
            state,
            dispatch,
            getters,
        }) {
            const find = {}
            for (let company in getters.companyDetails) {
                let { selected } = getters.companyDetails[company]
                if (selected) find[selected] = company
            }
            let { items } = Object.keys(find).length
                ? await this.getListByFilter(
                      state.collectionName,
                      Object.keys(find)
                          .map(
                              (id) =>
                                  `${
                                      getters.companyDetails[find[id]].id
                                  }='${id}'`
                          )
                          .join('&&'),
                      'office_id'
                  )
                : await this.getFullList(state.collectionName, {
                      expand: 'office_id',
                  })
            let filteredItems = items.map((employee) => expanding(employee))
            commit('SET_FILTERED_EMPLOYEES', filteredItems)
        },
        async GET_OFFICE_BY_RELATION({ commit, state }) {
            let { division_id, company_id } = state.employee
            if (!division_id || !company_id) {
                return
            }
            let data = await Promise.all([
                this.getList(
                    'companies',
                    company_id,
                    'companies_offices(company_id).office_id'
                ),
                this.getList(
                    'divisions',
                    division_id,
                    'offices_divisions(division_id).office_id'
                ),
            ])

            let offices = data.map(({ items }) => expandValues(items))
            let { id } = findObjectWithSameId(offices[0], offices[1])
            commit('SET_EMPLOYEE', { office_id: id })
        },
    },
    getters: {
        employee: (state) => state.employee,
        employees: (state) => state.employees,
    },
}
function generateEmployeeData(state, getters) {
    let employState = { ...state.employee, photo: getters.image.file }
    let employ = {}
    for (let info in employState) {
        let add = employState[info]
        if (add) employ[info] = employState[info]
    }
    return employ
}
