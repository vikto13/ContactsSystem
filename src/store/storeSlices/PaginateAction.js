export default {
    state: {
        currentPage: 0,
        sizeOfPaginate: 25,
        options: [5, 10, 25, 50, 100],
    },
    mutations: {
        SET_TO_NEXT_PAGE(state) {
            state.currentPage = state.currentPage + 1
        },
        SET_TO_PREVIUOS_PAGE(state) {
            state.currentPage = state.currentPage - 1
        },
        SET_PAGINE(state, size) {
            state.sizeOfPaginate = size
        },
    },
    getters: {
        currentPage: (state) => state.currentPage,
        sizeOfPaginate: (state) => state.sizeOfPaginate,
        optionsForPaginate: (state) => state.options,
    },
}
