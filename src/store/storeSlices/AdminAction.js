import { pocketBase } from "../../../services/pocketBase";
import { AdminState } from "../initState/AdminState";

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
            const data = await pocketBase.collection('admin').getFullList()
            commit("setAdmins", data)
        },
        async deleteAdmin({ commit, state }) {
            await pocketBase.collection('admin').delete(state.admin.id)
        },
        async updateAdmin({ commit, state }) {
            await pocketBase.collection('admin').update(state.admin.id, state.admin)
        },
        clearAdminData({ commit }) {
            commit("clearAdmin")
        },
        async saveAdmin({ state, getters }) {
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
        setAdmin({ commit, getters }, id) {
            commit("setAdmin", getters.admins.find((value) => value.id == id))
        },
        setWhatDo({ commit }, what) {
            commit("setAdminAction", what)
        }
    },
    getters: {
        adminRoles: (state) => state.roles,
        admin: (state) => state.admin,
        admins: (state) => state.admins
    }
}