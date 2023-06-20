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
        UPLOAD_IMAGE({ commit }, image) {
            const reader = new FileReader()
            reader.onload = (event) => {
                commit('SET_RESULT', event.target.result)
            }
            commit('SET_IMAGE', { file: image })
            reader.readAsDataURL(image)
        },
        async GET_IMAGE_FROM_API({ commit }, { record, fileName }) {
            let url = this.getUrl(record, fileName)
            commit('SET_RESULT', url)
        },
    },
    getters: {
        image: (state) => state,
    },
}
