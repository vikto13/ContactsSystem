import { UserState } from '../initState/UserState'
import { expanding } from './expandAction'

export default {
    state: UserState(),
    mutations: {
        SET_USER(state, record) {
            let { user } = UserState()
            for (let userInfo in user) {
                let info = record[userInfo]
                state.user[userInfo] = info ? info : user[userInfo]
            }
        },
        REMOVE_USER(state) {
            let userState = UserState()
            for (let user in userState.user) {
                state.user[user] = userState.user[user]
            }
        },
        SET_USER_IMAGE_URL(state, image) {
            state.user.avatarUrl = image
        },
    },
    actions: {
        async authWithPassword({ commit, state }) {
            const data = await this.authWithPassword(
                state.collectionName,
                state.user.email,
                state.user.password,
                'permissions_id'
            )
            await commit('setUser', {
                ...expanding(data.record),
                token: data.token,
                password: '',
                passwordConfirm: '',
            })
        },
        async authWithToken({ commit, state }) {
            const { record, token } = await this.authRefresh(
                state.collectionName,
                'permissions_id'
            )
            console.log(record)
            await commit('setUser', { ...expanding(record), token: token })
        },
        async resetPassword({ state }) {
            await this.requestPasswordReset(
                state.collectionName,
                state.user.email
            )
        },
        async changePassword({ state }, { token }) {
            await this.confirmPasswordReset(state.collectionName, {
                token,
                password: state.user.password,
                passwordConfirm: state.user.passwordConfirm,
            })
        },
    },
    getters: {
        user: (state) => state.user,
    },
}
