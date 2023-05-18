import { pocketBase } from "../../../services/pocketBase";
import { UserState } from "../initState/UserState";

export default {
    state: UserState,
    mutations: {
        setUser(state, { token, record }) {
            state.token = token;
            state = { ...record }
        }
    },
    actions: {
        async authWithPassword({ commit }, user) {
            const { token, record } = await pocketBase.collection('users').authWithPassword(
                user.email,
                user.password);
            commit("setUser", { token, record })
        },
        async resetPassword(_, email) {
            await pocketBase.collection('users').requestPasswordReset(email)
        }
    },
    getters: {
        user: (state) => ({ ...state })
    }
}