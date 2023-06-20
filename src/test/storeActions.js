import vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue'
import { vi } from 'vitest'
import { EmployeeState } from '../store/initState/EmployeeState'

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
            submit: false,
            messageTexts: {
                street: 'Gatvė turi būti įvesta',
                street_number: 'Gatvės numerys turi būti įvestas',
                city: 'Miestas turi būti įvestas',
                country: 'Šalis turi būti įvestas',
                name: "Pavadinimas turi būti įvestas",
                surname: "Pavardė turi būti įvesta",
                position: 'Pozicija turi būti įvesta',
                phone_number: 'Telefono numerys turi būti įvestas',
                second_password: `Slaptažodžiai turi būti vienodi`,
                password: 'Įveskite slaptažodį',
            },
        },
        navBar: {
            companies: {
                what: 'įmonę',
                whose: 'Įmonės',
                textAdd: 'Pridėti naują įmonę',
                textEmpty: 'Nėra pridėta įmonių',
                title: 'Įmonė',
                path: '/companies/records',
                permissions: ['delete_companies', 'edit_companies'],
            },
        },
        company: {
            name: 'Test1',
            id: ["542", "784"],
            collectionName: 'companies',
            relation: [],
            table: '',
        },
        employee: {
            id: 1,
            name: "Test1",
            surname: "Test2",
            email: "email",
            photo: null
        },
        office: {
            name: '',
            id: null,
            street: '',
            country: '',
            city: '',
            street_number: null,
            expand: null,
            company: [],
            savedCompanies: []
        },
        details: {
            companies: {
                name: 'companies',
                id: 'company_id',
                all: [],
            }
        },
    }),
    getters: {
        user: (state) => state.user,
        adminRoles: (state) => state.adminState.permissions,
        admin: (state) => state.adminState.admin,
        messageIsSubmitted: (state) => state.message.submitted,
        navBar: (state) => state.navBar,
        company: (state) => state.company,
        office: (state) => state.office,
        companyDeatils: (state) => state.details,
        messageTexts: (state) => state.messageTexts
    },
    actions: {
        FETCH_ROLES: vi.fn(),
        SUBMIT_MESSAGE: vi.fn(),
        UPDATE_ADMIN: vi.fn(),
        DISMISS_DIALOG: vi.fn(),
        AUTH_WITH_TOKEN: vi.fn(),
        FETCH_ADMINS: vi.fn(),
    },
    mutations: {
        REMOVE_EMPLOYEE: (state) => {
            let { employee } = EmployeeState()
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        SET_TO_SUBMIT_MESSAGE(state, show) {
            state.message.submit = show
        },
    },
})
