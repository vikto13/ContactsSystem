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
        setAdminRole(state) {
            let roles = Object.keys(state.permissions)
            for (let index in roles) {
                state.admin.permissions_id[roles[index]] && state.admin.roles.push(roles[index])
            }
        },
        setAdminAction(state, action) {
            state.admin.whatDo = action
        }
    },
    actions: {
        async fetchRoles({ commit }) {
            const data = await pocketBase.collection('user_permissions').getFullList()
            commit("setRoles", data)
        },
        async fetchAdmins({ commit, state }) {
            const data = await pocketBase.collection(state.collectionName).getFullList()
            console.log(data)
            commit("setAdmins", data)
        },
        async deleteAdmin({ commit, state }) {
            await pocketBase.collection(state.collectionName).delete(state.admin.id)
        },
        async updateAdmin({ getters, state }) {
            await axios.patch(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records/${state.admin.id}`,
                {
                    name: state.admin.name,
                    email: state.admin.email,
                    avatar: getters.image.file,
                    permissions_id: state.admin.permissions_id.id,
                    emailVisibility: true,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${getters.user.token}`

                    }
                }
            )
        },
        async updateRoles({ state }) {
            await pocketBase.collection('user_permissions').update(state.admin.permissions_id.id, getPermissions(state));
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
            let { id } = await pocketBase.collection('user_permissions').create(getPermissions(state));
            await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records`,
                {
                    ...state.admin,
                    permissions_id: id,
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
        async setUserAvatar({ commit, state }) {
            if (state.avatar) {
                let image = await axios.get(
                    `${import.meta.env.VITE_POCKET_BASE_URL}/api/files/users/${state.admin.id
                    }/${state.admin.avatar}?thumb=100x300`,
                    { responseType: "blob" }
                );
                let avatar = new FileReader();
                avatar.readAsDataURL(image.data);
                commit("setAdmin", { avatar })
            }
        },
        async setAdmin({ commit, getters, state }, id) {
            let data = await pocketBase
                .collection(state.collectionName)
                .getFirstListItem(`id="${id}"`, { expand: 'permissions_id' });
            for (let expanded in data.expand) {
                data[expanded] = data.expand[expanded]
            }
            commit("setAdmin", data)
        },
        setWhatDo({ commit }, what) {
            commit("setAdminAction", what)
        },
    },
    getters: {
        adminRoles: (state) => state.permissions,
        admin: (state) => state.admin,
        admins: (state) => state.admins,
        adminPages: (state) => state.pages,
    }
}

function getPermissions({ permissions, admin }) {
    let savePermissions = {}
    Object.keys(permissions).map((id) => {
        savePermissions[id] = admin.roles.includes(id)
    })
    return savePermissions
}