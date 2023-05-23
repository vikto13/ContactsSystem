import { OfficeState } from "../initState/OfficeState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: OfficeState,
    mutations: {
        setOffice(state, data) {
            if (data) {
                state.office.name = data.name
                state.office.street = data.street
                state.office.country = data.country
                state.office.city = data.city
                state.office.street_number = data.street_number
                state.office.id = data.id
            } else {
                state.office.name = ''
                state.office.street = ''
                state.office.country = ''
                state.office.city = ''
                state.office.street_number = null
                state.office.id = null
            }
        },
        setOffices(state, list) {
            state.offices = list
        }
    },
    actions: {
        async findOffice({ commit }, id) {
            const data = await pocketBase
                .collection("office")
                .getFirstListItem(`id="${id}"`);
            commit("setOffice", data)

        },
        async saveOffice({ state, commit }) {
            await pocketBase.collection("office").create(state.office)
            commit('setOffice', null)
        },
        async fetchOffices({ commit }) {
            let allOffice = await pocketBase.collection("office").getFullList({ sort: '-created', });
            commit('setOffices', allOffice)
        },
        async editOffice({ state }) {
            await pocketBase
                .collection("office")
                .update(state.office.id, state.office);
        },
        async deleteOffice({ commit, state }) {
            await pocketBase
                .collection("office")
                .delete(state.office.id)
            commit("setOffice", null)
        },

    },
    getters: {
        office: (state) => state.office,
        offices: (state) => state.offices
    },
}