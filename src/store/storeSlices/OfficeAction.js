import { OfficeState } from "../initState/OfficeState"
import { pocketBase } from "../../../services/pocketBase";
import axios from "axios";

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
        async findOffice({ commit }, id) {
            const data = await pocketBase
                .collection("office")
                .getFirstListItem(`id="${id}"`, { expand: 'companies' });
            console.log({ ...data, companies: data.expand.companies ? data.expand.companies : [] })
            commit("setOffice", data)

        },
        async saveOffice({ state, commit, getters }) {
            await pocketBase
                .collection("office")
                .create(state.office);
        },
        async fetchOffices({ commit }) {
            let allOffice = await pocketBase.collection("office").getFullList({ sort: '-created', expand: 'companies' });
            allOffice = allOffice.map((value) => {
                return { ...value, companies: value.expand.companies ? value.expand.companies : [] }
            })
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
function convertOfficeData(office, id) {
    return {
        city: office.city,
        country: office.country,
        name: id,
        street: office.street,
        street_number: office.street_number
    }
}