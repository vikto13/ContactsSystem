import { OfficeState } from '../initState/OfficeState'

export default {
    state: OfficeState(),
    mutations: {
        SET_OFFICE(state, data) {
            if (data) {
                for (let office in state.office) {
                    state.office[office] = data[office]
                }
            }
        },
        REMOVE_OFFICE(state) {
            let { office } = OfficeState()
            for (let value in office) {
                state.office[value] = office[value]
            }
        },
        SET_OFFICES(state, list) {
            state.offices = list
        },
    },
    actions: {
        async FIND_OFFICE({ commit, state }, id) {
            const data = await this.getFirstList(state.collectionName, id)
            let savedCompanies = await this.getFullList('companies_offices', {
                filter: `office_id="${data.id}"`,
            })
            commit('SET_OFFICE', {
                ...data,
                savedCompanies,
                company: savedCompanies.map(({ company_id }) => company_id),
            })
        },
        async POST_OFFICE({ state }) {
            let { city, country, street, street_number, company } = state.office
            let officeData = {}
            for (let info in state.office) {
                let setData = state.office[info]
                if (setData) officeData[info] = state.office[info]
            }
            let { id } = await this.saveRecord(state.collectionName, {
                ...officeData,
                name: `${street} ${street_number}, ${city}, ${country}`,
            })
            await Promise.all(
                company.map((company_id) => {
                    return this.saveRecords('companies_offices', {
                        office_id: id,
                        company_id,
                    })
                })
            )
        },
        async FETCH_OFFICES({ commit, state }) {
            let allOffice = await this.getFullList(state.collectionName)
            commit('SET_OFFICES', allOffice)
        },
        async EDIT_OFFICE({ state }) {
            let { city, country, street, street_number } = state.office
            let { id } = await this.updateRecord(
                state.collectionName,
                state.office.id,
                {
                    ...state.office,
                    name: `${street} ${street_number}, ${city}, ${country}`,
                }
            )

            await Promise.all(
                state.office.company
                    .filter((value) => {
                        return !state.office.savedCompanies.some(
                            (obj) => obj.company_id == value
                        )
                    })
                    .map((company_id) => {
                        return this.saveRecords('companies_offices', {
                            office_id: id,
                            company_id,
                        })
                    })
            )
            await Promise.all(
                state.office.savedCompanies
                    .filter(
                        ({ company_id }) =>
                            !state.office.company.some((id) => id == company_id)
                    )
                    .map(({ id }) => {
                        return this.deleteRecord('companies_offices', id)
                    })
            )
        },
        async DELETE_OFFICE({ state }) {
            await this.deleteRecord(state.collectionName, state.office.id)
        },
    },
    getters: {
        office: (state) => state.office,
        offices: (state) => state.offices,
    },
}
