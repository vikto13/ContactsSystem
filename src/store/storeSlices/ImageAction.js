import { pocketBase } from "../../../services/pocketBase";
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
            const data = new FormData();
            // // this.image.previewImage = image;

            reader.readAsDataURL(image);
            reader.onload = async (e) => {


                // data.append('picture', e.target.result);
                // const arrayBuffer = e.target.result;
                const im = { ...image, imageUrl: e.target.result, fileName: image.name }
                const blob = new Blob([im], { type: image.type });
                console.log(blob)
                // try {
                await pocketBase.collection('admin').create({
                    name: "test",
                    email: "test", avatar: blob
                })

                // } catch (error) {
                //     console.log(error)
                // }

                // commit({ base64: e.target.result, name: image.name })

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