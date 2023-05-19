import { DialogState } from "../initState/DialogState";

export default {
    state: DialogState,
    mutations: {
        setToShow(state, show) {
            state.screen = show
            state.show = true
        },
        disableDialog(state) {
            state.show = false
        }
    },
    actions: {
        triggerDialog({ commit }, show) {
            commit("setToShow", show)
        },
        dismissDialog({ commit }) {
            commit("disableDialog")
        }
    },
    getters: {
        dialog: (state) => state
    }
}