import { EmployeeState } from '../initState/EmployeeState'
import { expanding, expandValues } from './expandAction'
import { findObjectWithSameId } from './filterAction'

export default {
    state: EmployeeState(),
    mutations: {
        setEmployee(state, employee) {
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        clearEmployee(state) {
            let { employee } = EmployeeState()
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        setEmployees(state, list) {
            state.employees = list
        },
        setFilteredEmployees(state, list) {
            state.filteredEmployees = list
        },
    },
    actions: {
        async findEmployee({ commit, state, dispatch }, id) {
            let data = await this.getFirstList(state.collectionName, id)
            data.photo &&
                dispatch('getImageFromApi', {
                    record: data,
                    fileName: data.photo,
                })
            commit('setEmployee', data)
        },
        async findAndExpandEmployee({ commit, state }, id) {
            let data = await this.getFirstList(state.collectionName, id, {
                expand: 'department_id,company_id,division_id,office_id,group_id',
            })
            commit('setEmployee', expanding(data))
        },
        async saveEmployee({ state, getters }) {
            await this.saveRecord(
                state.collectionName,
                generateEmployeeData(state, getters)
            )
        },
        async fetchEmployees({ commit, state }) {
            let data = await this.getFullList(state.collectionName, {
                expand: 'department_id,division_id,group_id,office_id,company_id',
            })
            await commit('setEmployees', data)
        },
        async editEmployee({ state, getters }) {
            this.updateRecord(
                state.collectionName,
                state.employee.id,
                generateEmployeeData(state, getters)
            )
        },
        async deleteEmployee({ state }) {
            await this.deleteRecord(state.collectionName, state.employee.id)
        },
        async searchContactByText({ commit, state }) {
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
            commit('setEmployees', filteredItems)
        },
        async searchContactBySelections({ commit, state, dispatch, getters }) {
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
            commit('setFilteredEmployees', filteredItems)
        },
        async setOfficeByDivisionAndCompany({ commit, state }) {
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
            commit('setEmployee', { office_id: id })
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
