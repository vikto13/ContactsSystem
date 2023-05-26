import { pocketBase } from "../../../services/pocketBase";
import { UserState } from "../initState/UserState";

export default {
    state: UserState,
    mutations: {
        setUser(state, record) {
            for (let user in state) {
                state[user] = record[user]
            }
        },
        clearUserData(state) {
            for (let user in state) {
                state[user] = null
            }
        }
    },
    actions: {
        async authWithPassword({ commit }, user) {
            const data = await pocketBase.collection('users').authWithPassword(
                user.email,
                user.password);
            console.log(data)
            commit("setUser", { ...data.record, token: data.token })
        },
        async resetPassword(_, email) {
            await pocketBase.collection('users').requestPasswordReset(email)
        }
    },
    getters: {
        user: (state) => ({ ...state })
    }
}