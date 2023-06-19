import { MessageState } from '../initState/MessageState'
export default {
    state: MessageState,
    mutations: {
        SET_TO_SHOW_MESSAGE(state, add) {
            for (let action in state.message) {
                state.message[action] = add[action]
            }
        },
        SET_TO_SHOW_LOADING(state, isLoading) {
            state.loading = isLoading
        },
        SET_TO_SUBMIT_MESSAGE(state, show) {
            state.submit = show
        },
    },
    actions: {
        SHOW_MESSAGE({ commit }, info) {
            commit('SET_TO_SHOW_MESSAGE', { active: true, ...info })
        },
        SHOW_LOADING({ commit }, show) {
            commit('SET_TO_SHOW_LOADING', show)
        },
        SUBMIT_MESSAGE({ commit }) {
            commit('SET_TO_SUBMIT_MESSAGE', true)
        },
    },
    getters: {
        message: (state) => state.message,
        isLoading: (state) => state.loading,
        messageTexts: (state) => state.messageTexts,
        messageIsSubmitted: (state) => state.submit,
    },
}
