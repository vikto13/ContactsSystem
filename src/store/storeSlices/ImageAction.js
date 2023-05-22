
export default {
    state: {
        base64: null,
        name: null,
    },
    mutations: {
        setImage(state, image) {
            state.name = image.name
            state.base64 = image.base64
        }
    },
    actions: {
        uploadImage({ commit }, e) {
            const [image] = e.target.files;

            const reader = new FileReader();
            // // this.image.previewImage = image;
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                commit({ base64: e.target.result, name: image.name })

            };
        },
        // async fetchRoles({ commit }) {
        //     const data = await pocketBase.collection('admin_roles').getFullList()
        //     commit("setRoles", data)
        // },
        // async saveAdmin({ commit, state }, image) {
        //     await pocketBase.collection('admin').create({ ...state.admin, avatar: image });
        // }
    },
    getters: {
        image: (state) => state,
    }
}