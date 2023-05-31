import { pocketBase } from "../../../services/pocketBase";
import { AdminState } from "../initState/AdminState";
import axios from 'axios';
import generator from "generate-password-browser";

export default {
    state: AdminState(),
    mutations: {
        setRoles(state, roles) {
            state.roles = roles
        },
        setAdmins(state, admins) {
            state.admins = admins
        },
        clearAdmin(state) {
            let { admin } = AdminState();
            for (let adminState in admin) {
                state.admin[adminState] = admin[adminState]
            }

        },
        setPassword(state, password) {
            state.admin.password = password
            state.admin.passwordConfirm = password
        },
        setAdmin(state, admin) {
            for (let adminState in admin) {
                state.admin[adminState] = admin[adminState]
            }
        },
        setAdminAction(state, action) {
            state.admin.whatDo = action
        }
    },
    actions: {
        async fetchRoles({ commit }) {
            const data = await pocketBase.collection('admin_role').getFullList()
            commit("setRoles", data)
        },
        async fetchAdmins({ commit }) {
            const data = await pocketBase.collection('users').getFullList()
            console.log(data)
            commit("setAdmins", data)
        },
        async deleteAdmin({ commit, state }) {
            await pocketBase.collection('users').delete(state.admin.id)
        },
        async updateAdmin({ getters, state }) {
            await axios.patch(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records/${state.admin.id}`,
                {
                    ...state.admin,
                    avatar: getters.image.file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${getters.user.token}`

                    }
                }
            )
        },
        clearAdminData({ commit }) {
            commit("clearAdmin")
        },
        async saveAdmin({ state, getters, commit }) {
            let password =
                generator.generate({
                    length: 8,
                    numbers: true,
                })

            await commit("setPassword", password)
            console.log({
                ...state.admin,
                avatar: getters.image.file,
            },)
            await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records`,
                {
                    ...state.admin,
                    avatar: getters.image.file,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${getters.user.token}`

                    }
                }
            )

        },
        async setAdmin({ commit, getters }, id) {

            const data = await pocketBase
                .collection("users")
                .getFirstListItem(`id="${id}"`);
            console.log(data)
            commit("setAdmin", data)
        },
        setWhatDo({ commit }, what) {
            commit("setAdminAction", what)
        }
    },
    getters: {
        adminRoles: (state) => state.roles,
        admin: (state) => state.admin,
        admins: (state) => state.admins,
        adminPages: (state) => state.pages
    }
}