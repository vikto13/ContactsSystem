import { MessageState } from "../initState/MessageState"
export default {
    state: MessageState,
    mutations: {
        setToShow(state, show) {
            state.active = show
        }
    },
    actions: {
        triggerMessage({ commit }) {
            commit("setToShow", true)
        },
    },
    getters: {
        message: (state) => state
    }
}