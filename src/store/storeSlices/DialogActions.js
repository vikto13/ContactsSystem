import { DialogState } from "../initState/DialogState";

export default {
    state: DialogState,
    mutations: {
        setToShow(state, show) {
            state.show = show
        }
    },
    actions: {
        triggerDialog({ commit }) {
            commit("setToShow", true)
        },
    },
    getters: {
        showDialog: (state) => state.show
    }
}