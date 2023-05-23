export default {
    state: {
        currentPage: 0,
        sizeOfPaginate: 6
    },
    mutations: {
        nextPage(state) {
            state.currentPage = state.currentPage + 1
        },
        previuosPage(state) {
            state.currentPage = state.currentPage - 1
        }
    },
    getters: {
        currentPage: (state) => state.currentPage,
        sizeOfPaginate: (state) => state.sizeOfPaginate
    }
}