export default {
    state: {
        file: null,
        result: '',
        buttonIsPressed: false,
    },
    mutations: {
        SET_IMAGE(state, image) {
            for (let info in state) {
                state[info] = image[info]
            }
        },
        REMOVE_IMAGE(state) {
            for (let value in state) {
                state[value] = null
            }
        },
        SET_RESULT(state, result) {
            state.result = result
        },
        SET_IMAGE_BUTTON_PRESSED(state, isPressed) {
            state.buttonIsPressed = isPressed
        },
    },
    actions: {
        uploadImage({ commit }, image) {
            const reader = new FileReader()
            reader.onload = (event) => {
                console.log(event)
                commit('setResult', event.target.result)
            }
            commit('setImage', { file: image })
            reader.readAsDataURL(image)
        },
        async getImageFromApi({ commit }, { record, fileName }) {
            let url = this.getUrl(record, fileName)
            commit('setResult', url)
        },
    },
    getters: {
        image: (state) => state,
    },
}
