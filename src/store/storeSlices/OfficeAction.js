import { OfficeState } from "../initState/OfficeState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: OfficeState,
    mutations: {
        setOffice(state, data) {
            if (data) {
                for (let office in state.office) {
                    state.office[office] = data[office]
                }
            }
        },
        clearOfficeState(state) {
            for (let value in state.office) {
                state.office[value] = null
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

        },

    },
    getters: {
        office: (state) => state.office,
        offices: (state) => state.offices
    },
}