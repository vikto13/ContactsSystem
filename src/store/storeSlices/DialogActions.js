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
        triggerDialog({ commit }, show) {
            commit('setToShowDialog', show)
        },
        dismissDialog({ commit }) {
            commit('disableDialog')
        },
    },
    getters: {
        dialog: (state) => state,
    },
}
