import { pocketBase } from "../../../services/pocketBase";
import { UserState } from "../initState/UserState";

export default {
    state: UserState,
    mutations: {
        setUser(state, { token, record }) {
            state.token = token;
            state.id = record.id
            state.username = record.username
            state.verified = record.verified
            state.emailVisibility = record.emailVisibility
            state.email = record.email
            state.name = record.name
            state.avatar = record.avatar
        }
    },
    actions: {
        async authWithPassword({ commit }, user) {
            const data = await pocketBase.collection('users').authWithPassword(
                user.email,
                user.password);
            commit("setUser", data)
        },
        async resetPassword(_, email) {
            await pocketBase.collection('users').requestPasswordReset(email)
        }
    },
    getters: {
        user: (state) => ({ ...state })
    }
}