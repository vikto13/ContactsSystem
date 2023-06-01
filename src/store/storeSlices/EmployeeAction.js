import { EmployeeState } from "../initState/EmployeeState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: EmployeeState(),
    mutations: {
        setEmployee(state, employee) {
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        clearContact(state) {
            let { employee } = EmployeeState()
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        setEmployees(state, list) {
            state.employees = list
        },
    },
    actions: {
        async findEmployee({ commit, state }, id) {

            let data = await pocketBase
                .collection(state.collectionName)
                .getFirstListItem(`id="${id}"`);


            // for(expanded in data.expand) {
            //     data[expanded]=state.employee[expanded]
            // }

            commit("setEmployee", data)

        },
        async savesetEmployee({ state, getters }) {
            await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${state.collectionName}/records`,
                {
                    ...state.employee,
                    image: getters.image.file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${getters.user.token}`

                    }
                }
            )
        },
        async fetchEmployees({ commit, getters, state }) {
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
        async editEmployee({ state }) {
            await pocketBase
                .collection(state.collectionName)
                .update(state.contact.id, state.contact);
        },
        async deleteEmployee({ state }) {
            await pocketBase
                .collection(state.collectionName)
                .delete(state.employee.id)
        },
    },
    getters: {
        employee: (state) => state.employee,
        employees: (state) => state.employees,


    },
}