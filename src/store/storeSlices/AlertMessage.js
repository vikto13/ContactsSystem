
export default {
    state: {
        showAlert: false,
        showMessage: null,
        message: {
            404: "Kažkas nutiko, pabandykite dar kartą",
            400: "Neteisingas elektroninis paštas arba slaptažodis",
            405: 'Kažkas nutiko arba jums leidimas tokiam veiksmui nėra duotas'
        },
    },
    mutations: {
        setToNotShowAlert(state) {
            state.showAlert = false
        },
        setToShowAlert(state, message) {
            state.showAlert = true
            state.showMessage = message

        }
    },
    actions: {
        triggerAlert({ commit }) {
            commit("setToTriggerAlert")
        },
        showAlert({ commit }, status) {
            commit("setToShowAlert", status)
        },
    },
    getters: {
        alert: (state) => state,
    }
}