import { ContactState } from "../initState/ContactState"
import { pocketBase } from "../../../services/pocketBase";
import axios from "axios";

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
        }, clearSearch(state) {
            state.search = null
        }
    },
    actions: {
        async findContact({ commit, getters }, id) {
            const data = await pocketBase
                .collection("contacts")
                .getFirstListItem(`id="${id}"`, {
                    expand: 'companies,companies,divisions,groups,departments'
                });
            for (let info in data.expand) {
                data[info] = data.expand[info].name
            }
            commit("setContact", data)

        },
        async saveContact({ state, getters }) {
            await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/contacts/records`,
                {
                    ...state.contact,
                    image: getters.image.file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${getters.user.token}`

                    }
                }
            )
        },
        async fetchContacts({ commit, getters }) {
            let list = await pocketBase.collection("contacts").getFullList({ sort: '-created', expand: 'companies' });
            let fetch = await Promise.all(
                list.map((value) => {
                    return value.expand.companies ? axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/office/records?filter=(companies?~'${value.expand.companies.id}')`) : null

                }))
            fetch.map((value, index) => {
                if (value) {
                    let { city, country, street, street_number } = value.data.items[0]
                    list[index].address = ` ${country}, ${city}, ${street} ${street_number}`
                } else {
                    list[index].address = ""
                }

            })
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
        async searchContactByText({ commit, getters, state }) {
            let { contacts } = getters
            const filteredItems = state.search
                ? contacts.filter(item =>
                    item.name.includes(state.search) ||
                    item.surname.includes(state.search) ||
                    item.position.includes(state.search)
                ) : contacts
            commit('setContacts', filteredItems)
        },
        async searchContactBySelections({ commit, getters }) {
            let find = {};
            for (let company in getters.companyDetails) {
                let { selected } = getters.companyDetails[company];
                selected ? find[selected] = company === 'office' ? 'companies' : company : null;
            }

            let list = await pocketBase.collection("contacts").getFullList({ sort: '-created', });

            let filteredItems = Object.keys(find).length ? list.filter(contact => Object.keys(find).filter(search => contact[find[search]] === search).length) : list
            commit('setContacts', filteredItems)
        },
    },
    getters: {
        contact: (state) => state.contact,
        contacts: (state) => state.contacts,


    },
}