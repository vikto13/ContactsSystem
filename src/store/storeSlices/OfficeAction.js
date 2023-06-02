import { OfficeState } from "../initState/OfficeState"
import { pocketBase } from "../../../services/pocketBase";

export default {
    state: OfficeState(),
    mutations: {
        setOffice(state, data) {
            if (data) {
                for (let office in state.office) {
                    state.office[office] = data[office]
                }
            }
        },
        clearOfficeState(state) {
            let { office } = OfficeState();
            for (let value in office) {
                state.office[value] = office[value]
            }
        },
        setOffices(state, list) {
            state.offices = list
        }
    },
    actions: {
        async findOffice({ commit, state }, id) {
            const data = await pocketBase
                .collection(state.collectionName)
                .getFirstListItem(`id="${id}"`);
            console.log(data)
            commit("setOffice", data)

        },
        async saveOffice({ state, commit, getters }) {
            let { city, country, street, street_number } = state.office;
            await pocketBase
                .collection(state.collectionName)
                .create({ ...state.office, name: `${street} ${street_number}, ${city}, ${country}` });
        },
        async fetchOffices({ commit, state }) {
            let allOffice = await pocketBase.collection(state.collectionName).getFullList({ sort: '-created' });
            commit('setOffices', allOffice)
        },
        async editOffice({ state }) {
            await pocketBase
                .collection(state.collectionName)
                .update(state.office.id, state.office);
        },
        async deleteOffice({ commit, state }) {
            await pocketBase
                .collection(state.collectionName)
                .delete(state.office.id)

        },

    },
    getters: {
        office: (state) => state.office,
        offices: (state) => state.offices
    },
}