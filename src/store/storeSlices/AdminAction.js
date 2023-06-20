import { AdminState } from '../initState/AdminState'
import generator from 'generate-password-browser'
import { expanding } from './expandAction'

export default {
    state: AdminState(),
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles
        },
        SET_ADMINS(state, admins) {
            state.admins = admins
        },
        REMOVE_ADMIN(state) {
            let { admin } = AdminState()
            for (let adminState in admin) {
                state.admin[adminState] = admin[adminState]
            }
        },
        SET_PASSWORD(state, password) {
            state.admin.password = password
            state.admin.passwordConfirm = password
        },
        SET_ADMIN(state, info) {
            let { admin } = AdminState()
            for (let adminState in admin) {
                let setInfo = info[adminState]
                state.admin[adminState] = setInfo ? setInfo : admin[adminState]
            }
        },
        SET_ADMIN_ROLE(state) {
            let roles = Object.keys(state.permissions)
            for (let index in roles) {
                state.admin.permissions_id[roles[index]] &&
                    state.admin.roles.push(roles[index])
            }
        },
        SET_ADMIN_ACTION(state, action) {
            state.admin.whatDo = action
        },
    },
    actions: {
        async FETCH_ROLES({ commit }) {
            let data = await this.getFullList('user_permissions')
            commit('SET_ROLES', data)
        },
        async FETCH_ADMINS({ commit, state }) {
            let data = await this.getFullList(state.collectionName)
            commit('SET_ADMINS', data)
        },
        async DELETE_ADMIN({ state }) {
            let { id, permissions_id } = state.admin
            await this.deleteRecord(state.collectionName, id)
            await this.deleteRecord('user_permissions', permissions_id.id)
        },
        async UPDATE_ADMIN({ getters, state }) {
            let data = {
                name: state.admin.name,
                email: state.admin.email,
                permissions_id: state.admin.permissions_id.id,
            }

            if (getters.image.file) {
                data['avatar'] = getters.image.file
            }
            await this.updateRecord(state.collectionName, state.admin.id, data)
        },
        async UPDATE_ROLES({ state }) {
            await this.updateRecord(
                'user_permissions',
                state.admin.permissions_id.id,
                getPermissions(state)
            )
        },
        REMOVE_ADMIN_STATE({ commit }) {
            commit('REMOVE_ADMIN')
        },
        async POST_ADMIN({ state, getters, commit }) {
            let password = generator.generate({
                length: 8,
                numbers: true,
            })

            await commit('SET_PASSWORD', password)
            let { id } = await this.saveRecord(
                'user_permissions',
                getPermissions(state)
            )

            let adminData = {}
            for (let info in state.admin) {
                let data = state.admin[info]
                if (data) adminData[info] = data
            }
            let avatar = getters.image.file
            if (avatar) {
                adminData = { ...adminData, avatar }
            }
            await this.saveRecord(state.collectionName, {
                ...adminData,
                permissions_id: id,
            })
        },
        async FETCH_ADMIN({ commit, state, dispatch }, id) {
            let data = await this.getFirstList(state.collectionName, id, {
                expand: 'permissions_id',
            })

            data.avatar &&
                dispatch('GET_IMAGE_FROM_API', {
                    record: data,
                    fileName: data.avatar,
                })
            await commit('SET_ADMIN', expanding(data))
        },
        SET_WHAT_DO_ADMIN({ commit }, what) {
            commit('SET_ADMIN_ACTION', what)
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
