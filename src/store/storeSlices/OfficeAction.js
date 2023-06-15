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

            let savedCompanies = await pocketBase.collection('companies_offices').getFullList({ filter: `office_id="${data.id}"` });
            commit("setOffice", { ...data, savedCompanies, company: savedCompanies.map(({ company_id }) => company_id) })
        },
        async saveOffice({ state }) {

            let { city, country, street, street_number, company } = state.office;
            let { id } = await pocketBase
                .collection(state.collectionName)
                .create({ ...state.office, name: `${street} ${street_number}, ${city}, ${country}` });
            await Promise.all(
                company.map(((company_id) => {
                    return pocketBase
                        .collection('companies_offices')
                        .create({ office_id: id, company_id }, { '$autoCancel': false });
                }))
            )

        },
        async fetchOffices({ commit, state }) {
            let allOffice = await pocketBase.collection(state.collectionName).getFullList({ sort: '-created' });
            commit('setOffices', allOffice)
        },
        async editOffice({ state }) {
            let { city, country, street, street_number } = state.office;
            let { id } = await pocketBase
                .collection(state.collectionName)
                .update(state.office.id, { ...state.office, name: `${street} ${street_number}, ${city}, ${country}` });
            await Promise.all(state.office.company.filter((value) => {
                return !state.office.savedCompanies.some(obj => obj.company_id == value)
            })
                .map(company_id => {
                    return pocketBase
                        .collection('companies_offices')
                        .create({ office_id: id, company_id }, { '$autoCancel': false });
                }))
            await Promise.all(state.office.savedCompanies.filter(({ company_id }) => !state.office.company.some((id) => id == company_id)).map(({ id }) => {
                return pocketBase.collection('companies_offices').delete(id)
            }))


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