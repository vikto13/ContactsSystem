export default {
    state: {
        currentPage: 0,
        sizeOfPaginate: 25,
        options: [5, 10, 25, 50, 100],
    },
    mutations: {
        nextPage(state) {
            state.currentPage = state.currentPage + 1;
        },
        previuosPage(state) {
            state.currentPage = state.currentPage - 1;
        },
        setPagine(state, size) {
            state.sizeOfPaginate = size
        }
    },
    getters: {
        currentPage: (state) => state.currentPage,
        sizeOfPaginate: (state) => state.sizeOfPaginate,
        optionsForPaginate: (state) => state.options
    },
};
