import { MessageState } from "../initState/MessageState"
export default {
    state: MessageState,
    mutations: {
        setToShowMessage(state, add) {
            for (let action in state) {
                state.title = info.title
                state[action] = add[action]
            }

        }
    },
    actions: {
        triggerMessage({ commit }, info) {
            commit("setToShowMessage", { active: true, ...info })
        },
    },
    getters: {
        message: (state) => state
    }
}