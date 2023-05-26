export default {
    state: {
        file: null,
        name: null
    },
    mutations: {
        setImage(state, image) {
            state.file = image
            state.name = image.name
        },
        clearImageState(state) {
            for (let value in state) {
                state[value] = null
            }
        }
    },
    actions: {
        uploadImage({ commit }, e) {
            const [image] = e.target.files;
            commit("setImage", image)
        },
    },
    getters: {
        image: (state) => state
    }
}