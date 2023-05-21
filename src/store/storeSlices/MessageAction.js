import { MessageState } from "../initState/MessageState"
export default {
    state: MessageState,
    mutations: {
        setToShowMessage(state, { show, info }) {
            state.active = show
            state.title = info.title
            state.content = info.content
        }
    },
    actions: {
        triggerMessage({ commit }, info) {
            commit("setToShowMessage", { show: true, info })
        },
    },
    getters: {
        message: (state) => state
    }
}