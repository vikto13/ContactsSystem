import { ContactState } from "../initState/ContactState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: ContactState,
    mutations: {
        // setName(state, name) {
        //     state.company.name = name
        // },
        // setId(state, { id, name }) {
        //     state.company.id = id
        //     state.company.name = name
        // },
        setContacts(state, list) {
            state.contacts = list
        }
    },
    actions: {
        // addCompanyName({ commit }, name) {
        //     commit("setName", name)
        // },
        // async findCompany({ commit }, { id, entity }) {
        //     const data = await pocketBase
        //         .collection(entity)
        //         .getFirstListItem(`id="${id}"`);
        //     commit("setId", data)

        // },
        async saveContact({ state }) {
            await pocketBase.collection("contacts").create(state.contact)
        },
        async fetchContacts({ commit }) {
            let list = await pocketBase.collection("contacts").getFullList({ sort: '-created', });
            commit('setContacts', list)
        },
        // async editCompany({ state }, entity) {
        //     await pocketBase
        //         .collection(entity)
        //         .update(state.company.id, { name: state.company.name });
        // },
        // async deleteCompany({ commit, state }, entity) {
        //     await pocketBase
        //         .collection(entity)
        //         .delete(state.company.id)
        //     commit("setId", { id: null, name: '' })
        // },

    },
    getters: {
        contact: (state) => state.contact,
        contacts: (state) => state.contacts,

    },
}