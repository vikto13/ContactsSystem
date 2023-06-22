export default {
    state: {
        layout: 'client-layout',
    },
    mutations: {
        SET_LAYOUT(state, payload) {
            state.layout = payload
        },
    },
    getters: {
        layout: (state) => state.layout,
    },
}
