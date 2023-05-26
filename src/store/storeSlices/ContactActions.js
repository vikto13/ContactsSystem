import { ContactState } from "../initState/ContactState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: ContactState,
    mutations: {
        setContact(state, contact) {
            if (contact) {
                for (let key in state.contact) {
                    state.contact[key] = contact[key] ? contact[key] : null
                }
            }
        },
        clearContact(state) {
            for (let key in state.contact) {
                state.contact[key] = null
            }
        },
        setContacts(state, list) {
            state.contacts = list
        }
    },
    actions: {
        async findContact({ commit, getters }, id) {
            const data = await pocketBase
                .collection("contacts")
                .getFirstListItem(`id="${id}"`, {
                    expand: 'companies,companies,divisions,groups,departments'
                });

            commit("setContact", data)

        },
        async saveContact({ state }) {
            await pocketBase.collection("contacts").create(state.contact)
        },
        async fetchContacts({ commit, getters }) {
            let list = await pocketBase.collection("contacts").getFullList({ sort: '-created', });
            commit('setContacts', list)
        },
        async editContact({ state }) {
            await pocketBase
                .collection("contacts")
                .update(state.contact.id, state.contact);
        },
        async deleteContact({ state, commit }) {
            await pocketBase
                .collection("contacts")
                .delete(state.contact.id)
        },
        async searchContactByText({ commit }, search) {
            let list = await pocketBase.collection("contacts").getFullList();
            const filteredItems = search
                ? list.filter(item =>
                    item.name.includes(search) ||
                    item.surname.includes(search) ||
                    item.position.includes(search)
                ) : list
            commit('setContacts', filteredItems)
        },
        async searchContactBySelections({ commit, getters }) {
            const find = [];
            for (let company in getters.companyDetails) {
                let { selected } = getters.companyDetails[company];
                selected ? find.push({ [company]: selected }) : null;
            }
            let list = await pocketBase.collection("contacts").getFullList({ sort: '-created', });
            const filteredItems = find.length ? list.filter((value) => {
                return find.map((check) => value[Object.keys(check)[0]] == Object.values(check)[0]
                ).every(value => value === true);
            }) : list
            commit('setContacts', filteredItems)
        },
    },
    getters: {
        contact: (state) => state.contact,
        contacts: (state) => state.contacts,


    },
}