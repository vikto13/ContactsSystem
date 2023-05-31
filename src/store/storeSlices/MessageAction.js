import { MessageState } from "../initState/MessageState"
export default {
    state: MessageState,
    mutations: {
        setToShowMessage(state, add) {
            for (let action in state) {
                state[action] = add[action]
            }
        },
        setToShowLoading(state, isLoading) {
            state.loading = isLoading
        }
    },
    actions: {
        triggerMessage({ commit }, info) {
            commit("setToShowMessage", { active: true, ...info })
        },
        showLoading({ commit }, show) {
            commit("setToShowLoading", show)
        }
    },
    getters: {
        message: (state) => state,
        isLoading: (state) => state.loading
    }
}