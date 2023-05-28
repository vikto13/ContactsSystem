export default {
    state: {
        navBar: {
            contacts: { title: "Kontaktai", path: "/contacts/records" },
            companies: { title: "Įmonės", path: "/companies/records" },
            relationship: { title: "Struktūra", path: "/relationship/record" },
            offices: { title: "Būstinės", path: "/offices/records" },
            admins: { title: "Paskyros", path: "/admins/records" },
        }
    },
    // mutations: {
    //     setToShowMessage(state, add) {
    //         for (let action in state) {
    //             state[action] = add[action]
    //         }

    //     }
    // },
    // actions: {
    //     triggerMessage({ commit }, info) {
    //         commit("setToShowMessage", { active: true, ...info })
    //     },
    // },
    getters: {
        navBar: (state) => state.navBar
    }
}