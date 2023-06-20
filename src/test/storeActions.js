import vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue'
import { vi } from 'vitest'

Vue.use(vuex)
Vue.use(VueMaterial)

export default new vuex.Store({
    state: () => ({
        user: {
            token: 'tokenIs4',
            avatar: null,
        },
        adminState: {
            admin: {
                whatDo: 1,
                name: 'Test1',
                email: 'Test2',
            },
            permissions: {
                edit_employees: 'Redaguoti ir kurti kontaktus',
                delete_employees: 'Trinti kontaktus',
                edit_offices: 'Redaguoti ir kurti įmones',
                delete_offices: 'Trinti įmones',
                edit_structure: 'Redaguoti ir kurti struktūras',
                delete_structure: 'Trinti struktūras',
                read_permissions: 'Skaityti admin paskyras',
                edit_permissions: 'Redaguoti ir kurti administracines teises ',
                delete_permissions: 'Trinti admin paskyras',
                edit_companies: 'Redaguoti ir kurti būstines',
                delete_companies: 'Trinti būstines',
            },
        },
        message: {
            submitted: false,
        },
    }),
    getters: {
        user: (state) => state.user,
        adminRoles: (state) => state.adminState.permissions,
        admin: (state) => state.adminState.admin,
        messageIsSubmitted: (state) => state.message.submitted,
    },
    actions: {
        FETCH_ROLES: vi.fn(),
        SUBMIT_MESSAGE: vi.fn(),
        UPDATE_ADMIN: vi.fn(),
        DISMISS_DIALOG: vi.fn(),
        AUTH_WITH_TOKEN: vi.fn(),
        FETCH_ADMINS: vi.fn(),
    },
    mutations: {},
})
