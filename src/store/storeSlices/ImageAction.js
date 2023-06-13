import axios from 'axios'
export default {
    state: {
        file: null,
        name: null,
        result: ''
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
        },
        setResult(state, result) {
            state.result = result
        }
    },
    actions: {
        uploadImage({ commit }, e) {
            console.log("pressed")
            const [image] = e.target.files
            const reader = new FileReader();
            reader.onload = (event) => {
                commit("setResult", event.target.result)
            };
            reader.readAsDataURL(image);

            commit('setImage', image)
        },
        async setImageFromApi({ commit }, { tableName, entity, imageName, commitName }) {
            let image = await axios.get(
                `${import.meta.env.VITE_POCKET_BASE_URL
                }/api/files/${tableName}/${entity}/${imageName}?thumb=100x300`,
                { responseType: 'blob' }
            )
            let avatar = new FileReader()
            avatar.readAsDataURL(image.data)
            commit('setImage', { file: avatar, name: imageName })
        },
    },
    getters: {
        image: (state) => state,
    },
}
