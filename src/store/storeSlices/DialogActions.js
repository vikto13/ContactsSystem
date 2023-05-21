import { DialogState } from "../initState/DialogState";

export default {
    state: DialogState,
    mutations: {
        setToShowDialog(state, show) {
            state.screen = show
            state.show = true
        },
        disableDialog(state) {
            state.show = false
        }
    },
    actions: {
        triggerDialog({ commit }, show) {
            commit("setToShowDialog", show)
        },
        dismissDialog({ commit }) {
            commit("disableDialog")
        }
    },
    getters: {
        dialog: (state) => state
    }
}