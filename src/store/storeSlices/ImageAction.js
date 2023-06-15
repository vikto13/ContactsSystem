import axios from 'axios'
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
                commit("setResult", event.target.result)
            };
            commit('setImage', { file: image })
            reader.readAsDataURL(image);

        },
        async setImageFromApi({ commit, dispatch }, { tableName, entity, imageName, commitName }) {
            let image = await axios.get(
                `${import.meta.env.VITE_POCKET_BASE_URL
                }/api/files/${tableName}/${entity}/${imageName}?thumb=100x300`,
                { responseType: 'blob' }
            )
            dispatch("uploadImage", image.data)

        },
    },
    getters: {
        image: (state) => state,
    },
}
