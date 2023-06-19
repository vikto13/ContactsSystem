export default {
    state: {
        showAlert: false,
        showMessage: null,
        message: {
            404: 'Kažkas nutiko, pabandykite dar kartą',
            400: 'Neteisingas elektroninis paštas arba slaptažodis',
            405: 'Jums leidimas tokiam veiksmui nėra duotas',
        },
    },
    mutations: {
        SET_TO_NOT_SHOW_ALERT(state) {
            state.showAlert = false
        },
        SET_TO_SHOW_ALERT(state, message) {
            state.showAlert = true
            state.showMessage = message
        },
    },
    actions: {
        disableAlert({ commit }) {
            commit('setToNotShowAlert')
        },
        showAlert({ commit }, status) {
            commit('setToShowAlert', status)
        },
    },
    getters: {
        alert: (state) => state,
    },
}
