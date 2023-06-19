import { AdminState } from '../initState/AdminState'
import generator from 'generate-password-browser'
import { expanding } from './expandAction'

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
            let { admin } = AdminState()
            for (let adminState in admin) {
                state.admin[adminState] = admin[adminState]
            }
        },
        setPassword(state, password) {
            state.admin.password = password
            state.admin.passwordConfirm = password
        },
        setAdmin(state, info) {
            let { admin } = AdminState()
            for (let adminState in admin) {
                let setInfo = info[adminState]
                state.admin[adminState] = setInfo ? setInfo : admin[adminState]
            }
        },
        setAdminRole(state) {
            let roles = Object.keys(state.permissions)
            for (let index in roles) {
                state.admin.permissions_id[roles[index]] &&
                    state.admin.roles.push(roles[index])
            }
        },
        setAdminAction(state, action) {
            state.admin.whatDo = action
        },
    },
    actions: {
        async fetchRoles({ commit }) {
            let data = await this.getFullList('user_permissions')
            commit('setRoles', data)
        },
        async fetchAdmins({ commit, state }) {
            let data = await this.getFullList(state.collectionName)
            commit('setAdmins', data)
        },
        async deleteAdmin({ state }) {
            let { id, permissions_id } = state.admin
            await this.deleteRecord(state.collectionName, id)
            await this.deleteRecord('user_permissions', permissions_id.id)
        },
        async updateAdmin({ getters, state }) {
            const data = {
                name: state.admin.name,
                email: state.admin.email,
                avatar: getters.image.file,
                permissions_id: state.admin.permissions_id.id,
            }
            await this.updateRecord(state.collectionName, state.admin.id, data)
        },
        async updateRoles({ state }) {
            await this.updateRecord(
                'user_permissions',
                state.admin.permissions_id.id,
                getPermissions(state)
            )
        },
        clearAdminData({ commit }) {
            commit('clearAdmin')
        },
        async saveAdmin({ state, getters, commit }) {
            let password = generator.generate({
                length: 8,
                numbers: true,
            })

            await commit('setPassword', password)
            let { id } = await this.saveRecord(
                'user_permissions',
                getPermissions(state)
            )

            let adminData = {}
            for (let info in state.admin) {
                let data = state.admin[info]
                if (data) adminData[info] = data
            }

            await this.saveRecord(state.collectionName, {
                ...adminData,
                permissions_id: id,
                avatar: getters.image.file,
            })
        },
        async fetchAdmin({ commit, state, dispatch }, id) {
            let data = await this.getFirstList(state.collectionName, id, {
                expand: 'permissions_id',
            })
            dispatch('getImageFromApi', { record: data, fileName: data.avatar })
            await commit('setAdmin', expanding(data))
        },
        setWhatDo({ commit }, what) {
            commit('setAdminAction', what)
        },
    },
    getters: {
        adminRoles: (state) => state.permissions,
        admin: (state) => state.admin,
        admins: (state) => state.admins,
        adminPages: (state) => state.pages,
    },
}

function getPermissions({ permissions, admin }) {
    let savePermissions = {}
    Object.keys(permissions).map((id) => {
        savePermissions[id] = admin.roles.includes(id)
    })
    return savePermissions
}
