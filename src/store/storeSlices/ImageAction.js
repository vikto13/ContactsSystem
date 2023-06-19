export default {
    state: {
        file: null,
        result: '',
        buttonIsPressed: false,
    },
    mutations: {
        setImage(state, image) {
            for (let info in state) {
                state[info] = image[info]
            }
        },
        clearImageState(state) {
            for (let value in state) {
                state[value] = null
            }
        },
        setResult(state, result) {
            state.result = result
        },
        imageButtonPressed(state, isPressed) {
            state.buttonIsPressed = isPressed
        }
    },
    actions: {
        uploadImage({ commit }, image) {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event)
                commit("setResult", event.target.result)
            };
            commit('setImage', { file: image })
            reader.readAsDataURL(image);
        },
        async getImageFromApi({ commit }, { record, fileName }) {
            let url = this.getUrl(record, fileName)
            commit("setResult", url)
        },
    },
    getters: {
        image: (state) => state,
    },
}
