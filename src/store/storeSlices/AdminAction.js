import { pocketBase } from "../../../services/pocketBase";
import { AdminState } from "../initState/AdminState";
import axios from 'axios';
export default {
    state: AdminState,
    mutations: {
        setRoles(state, roles) {
            state.roles = roles
        },
        setAdmins(state, admins) {
            state.admins = admins
        },
        clearAdmin(state) {
            state.admin.name = ''
            state.admin.email = ''
            state.admin.roles = []
            state.admin.whatDo = null
        },
        setAdmin(state, admin) {
            state.admin.name = admin.name
            state.admin.email = admin.email
            state.admin.roles = admin.roles
            state.admin.id = admin.id
        },
        setAdminAction(state, action) {
            state.admin.whatDo = action
        }
    },
    actions: {
        async fetchRoles({ commit }) {
            const data = await pocketBase.collection('admin_role').getFullList()
            commit("setRoles", data)
        },
        async fetchAdmins({ commit }) {
            const data = await pocketBase.collection('users').getFullList()
            commit("setAdmins", data)
        },
        async deleteAdmin({ commit, state }) {
            await pocketBase.collection('users').delete(state.admin.id)
        },
        async updateAdmin({ getters, state }) {
            await axios.patch(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records/${state.admin.id}`,
                {
                    ...state.admin,
                    avatar: getters.image.file
                },
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )
        },
        clearAdminData({ commit }) {
            commit("clearAdmin")
        },
        async saveAdmin({ state, getters }) {
            await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records`,
                {
                    ...state.admin,
                    avatar: getters.image.file
                },
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )
            // const reader = new FileReader();
            // reader.readAsDataURL(image);
            // reader.onload = async (e) => {

            // await axios.post('http://127.0.0.1:8090/api/collections/admin/records',
            //     {
            //         name: "test",
            //         email: "test",
            //         avatar: image
            //     },
            //     { headers: { 'Content-Type': 'multipart/form-data', } });

            // commit({ base64: e.target.result, name: image.name })

            //     };
            // },
            // async fetchRoles({ commit }) {
            //     const data = await pocketBase.collection('admin_roles').getFullList()
            //     commit("setRoles", data)
            // },
            // async saveAdmin({ commit, state }, image) {
            //     await pocketBase.collection('admin').create({ ...state.admin, avatar: image });
            // }


            // const reader = new FileReader();
            // const blob = new Blob([getters.image.previewImage]);
            // await reader.readAsBinaryString(blob)
            // console.log(await reader.arrayBuffer)
            // const fd = new FormData();
            // fd.append('image', getters.image.previewImage, getters.image.previewImage.name)
            // console.log(getters.image)
            // const formData = new FormData();
            // formData.append('documents', getters.image.i);
            // console.log(getters.image.i)

            // for (let file of getters.image.i) {
            //     console.log(file)
            //     formData.append('documents', file);
            // }
            // console.log({ ...state.admin, avatar: imageData })
            // await pocketBase.collection('admin').create({ ...state.admin, avatar: getters.image.base64 });
        },
        async setAdmin({ commit, getters }, id) {

            const data = await pocketBase
                .collection("users")
                .getFirstListItem(`id="${id}"`);
            commit("setAdmin", data)
        },
        setWhatDo({ commit }, what) {
            commit("setAdminAction", what)
        }
    },
    getters: {
        adminRoles: (state) => state.roles,
        admin: (state) => state.admin,
        admins: (state) => state.admins,
        adminPages: (state) => state.pages
    }
}