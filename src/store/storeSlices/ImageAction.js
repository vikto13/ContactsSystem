export default {
    state: {
        file: null,
        name: null
    },
    mutations: {
        setImage(state, image) {
            state.file = image
            state.name = image.name
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