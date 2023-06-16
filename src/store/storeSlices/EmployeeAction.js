import { EmployeeState } from "../initState/EmployeeState"
import { pocketBase } from "../../services/pocketBase";
import axios from "axios";
import { expanding, expandTheLast } from "./expandAction";
import { findObjectWithSameId } from "./filterAction"

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
            let data = await pocketBase
                .collection(state.collectionName)
                .getFirstListItem(`id="${id}"`);
            data.photo && dispatch("setImageFromApi", { tableName: data.collectionName, entity: data.id, imageName: data.photo })
            commit("setEmployee", data)

        },
        async findAndExpandEmployee({ commit, state }, id) {
            let data = await pocketBase
                .collection(state.collectionName)
                .getFirstListItem(`id="${id}"`, { expand: 'department_id,company_id,division_id,office_id,group_id' });
            commit("setEmployee", expanding(data))
        },
        async saveEmployee({ state, getters }) {
            try {
                await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${state.collectionName}/records`,
                    {
                        ...state.employee,
                        photo: getters.image.file
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${getters.user.token}`
                        }
                    }
                )
            } catch (err) {
                console.log(err)
            }

        },
        async fetchEmployees({ commit, state }) {
            let list = await pocketBase.collection(state.collectionName).getFullList({
                sort: '-created',
                expand: 'department_id,division_id,group_id,office_id,company_id'
            });
            list.map(employee => {
                let employ = employee
                for (let expanded in employ.expand) {
                    employ[expanded] = employee.expand[expanded]
                }
                return employ

            })
            commit('setEmployees', list)
        },
        async editEmployee({ state, getters }) {

            await axios.patch(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${state.collectionName}/records/${state.employee.id}`,
                {
                    ...state.employee,
                    photo: getters.image.file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${getters.user.token}`
                    }
                }
            )

        },
        async deleteEmployee({ state }) {
            await pocketBase
                .collection(state.collectionName)
                .delete(state.employee.id)
        },
        async searchContactByText({ commit, state }) {
            let filteredItems = state.filteredEmployees
            if (state.contactSearch) {
                let filter = `filter=(email~'${state.contactSearch}'||name~'${state.contactSearch}'||phone_number~'${state.contactSearch}'||position~'${state.contactSearch}'||surname~'${state.contactSearch}')`
                let { data } =
                    await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/employees/records/?expand=office_id&${filter}`)
                filteredItems = data.items.filter(employee =>
                    filteredItems.some(obj2 => obj2.id === expanding(employee).id)
                )
            }
            commit('setEmployees', filteredItems)

        },
        async searchContactBySelections({ commit, state, dispatch, getters }) {
            const find = {};
            for (let company in getters.companyDetails) {
                let { selected } = getters.companyDetails[company];
                if (selected) find[selected] = company
            }
            let { data } =
                await axios.get(
                    Object.keys(find).length
                        ? `${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/employees/records/?filter=(
                    ${Object.keys(find).map((id) => `${getters.companyDetails[find[id]].id}='${id}'`).join("%26%26")})&expand=office_id`
                        : `${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/employees/records/?expand=office_id`
                )
            let filteredItems = data.items.map(employee => expanding(employee))
            commit('setFilteredEmployees', filteredItems)
        },
        async setOfficeByDivisionAndCompany({ commit, state }) {
            let { division_id, company_id } = state.employee
            if (!division_id || !company_id) {
                return
            }
            let data =
                await Promise.all([
                    axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/companies/records/${company_id}?expand=companies_offices(company_id).office_id`),
                    axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/divisions/records/${division_id}?expand=offices_divisions(division_id).office_id`)
                ])
            let offices = data.map(({ data }) => expandTheLast(data))
            let { id } = findObjectWithSameId(offices[0], offices[1])
            commit('setEmployee', { office_id: id })
        },
    },
    getters: {
        employee: (state) => state.employee,
        employees: (state) => state.employees,
    },
}
