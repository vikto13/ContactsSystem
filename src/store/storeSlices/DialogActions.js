import { DialogState } from '../initState/DialogState'

export default {
    state: DialogState,
    mutations: {
        SET_TO_SHOW_DIALOG(state, show) {
            state.screen = show
            state.show = true
        },
        SET_TO_DISABLE_DIALOG(state) {
            state.show = false
        },
    },
    actions: {
        SHOW_DIALOG({ commit }, show) {
            commit('SET_TO_SHOW_DIALOG', show)
        },
        DISMISS_DIALOG({ commit }) {
            commit('SET_TO_DISABLE_DIALOG')
        },
    },
    getters: {
        dialog: (state) => state,
    },
}
