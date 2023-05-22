import { MessageState } from "../initState/MessageState"
export default {
    state: MessageState,
    mutations: {
        setToShowMessage(state, { show, info }) {
            state.active = show
            state.title = info.title
            state.content = info.content
            state.action = info.action
            // state.destroy = info.beforeDestroy
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