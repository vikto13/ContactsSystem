import vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue'
import { vi } from 'vitest'
import { EmployeeState } from '../store/initState/EmployeeState'
import AdminState from '../store/initState/AdminState'

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
        Message: {
            submitted: false,
            submit: false,
            messageTexts: {
                street: 'Gatvė turi būti įvesta',
                street_number: 'Gatvės numerys turi būti įvestas',
                city: 'Miestas turi būti įvestas',
                country: 'Šalis turi būti įvestas',
                name: 'Pavadinimas turi būti įvestas',
                surname: 'Pavardė turi būti įvesta',
                position: 'Pozicija turi būti įvesta',
                phone_number: 'Telefono numerys turi būti įvestas',
                second_password: `Slaptažodžiai turi būti vienodi`,
                password: 'Įveskite slaptažodį',
            },
            message: {
                active: false,
                value: null,
                title: '',
                content: '',
                action: null,
                isAlert: false,
                cancelAction: null,
            },
        },
        navBar: {
            contacts: {
                title: 'Kontaktai',
                path: '/',
                detailedText: 'Detalesnė kontakto informacija',
                systemText: 'Kontaktų sistema',
                textEmpty: 'Nėra sukurtų kontaktų',
            },
            relationship: {
                title: 'Struktūros',
                path: '/relationship/record/divisions',
                textEmpty: 'Nėra sukurtų struktūrų',
                permissions: ['edit_structure', 'delete_structure'],
            },
            companies: {
                what: 'įmonę',
                whose: 'Įmonės',
                textAdd: 'Pridėti naują įmonę',
                textEmpty: 'Nėra pridėta įmonių',
                title: 'Įmonė',
                path: '/companies/records',
                permissions: ['delete_companies', 'edit_companies'],
            },
            divisions: {
                what: 'Padaliniai',
                whose: 'Padalinius',
                textAdd: 'Pridėti naują padalinį',
                textEmpty: 'Nėra pridėta padalinių',
                title: 'Padaliniai',
            },
            groups: {
                what: 'grupę',
                whose: 'Grupės',
                textAdd: 'Pridėti naują grupę',
                textEmpty: 'Nėra pridėta grupių',
                title: 'Grupė',
            },
            departments: {
                what: 'skyrių',
                whose: 'Skyrius',
                textAdd: 'Pridėti naują skyrių',
                textEmpty: 'Nėra pridėta skyriaus',
                title: 'Skyriai',
                path: 'departments',
            },
            offices: {
                title: 'Ofisai',
                textAdd: 'Pridėti naują ofisą',
                textEmpty: 'Nėra sukurtų ofisų',
                path: '/offices/records',
                what: 'ofisą',
                whose: 'Ofiso',
                permissions: ['delete_offices', 'edit_offices'],
            },
            admins: {
                textCreate: 'Sukurti admin paskyrą',
                textEmpty: 'Nėra sukurtų admino paskyrų',
                title: 'Paskyros',
                path: '/admins/records',
                loginPath: '/admin/login',
                permissions: [
                    'edit_permissions',
                    'delete_permissions',
                    'read_permissions',
                ],
            },
            employees: {
                title: 'Darbuotoju',
            },
        },
        Company: {
            company: {
                name: 'Test1',
                id: [],
                collectionName: 'companies',
                relation: [],
                table: '',
            },
        },
        employee: {
            id: 1,
            name: 'Test1',
            surname: 'Test2',
            email: 'email',
            photo: null,
        },
        employees: [],
        office: {
            name: '',
            id: null,
            street: '',
            country: '',
            city: '',
            street_number: '',
            expand: null,
            company: [],
            savedCompanies: [],
        },
        details: {
            companies: {
                name: 'companies',
                id: 'company_id',
                all: [],
                relationship: 'offices',
                relation: null,
                selected: '',
                types: [],
                relations: [
                    { path: 'companies_offices(office_id)', relation: [] },
                    { path: 'employees(company_id)', relation: [] },
                ],
                fetchFrom: [
                    {
                        path: 'companies_offices(office_id).company_id',
                        table: 'offices',
                    },
                ],
            },
            departments: {
                name: 'departments',
                id: 'department_id',
                all: [],
                relationship: 'divisions',
                relation: 'divisions',
                selected: '',
                types: [],
                relations: [
                    { path: 'employees(department_id)', relation: [] },
                    { path: 'departments_groups(department_id)', relation: [] },
                ],
                fetching: ['divisions_departments(division_id).department_id'],

                fetchFrom: [
                    {
                        path: 'departments_groups(group_id).department_id',
                        table: 'groups',
                    },
                    {
                        path: 'divisions_departments(division_id).department_id',
                        table: 'divisions',
                    },
                ],
            },
            divisions: {
                name: 'divisions',
                id: 'division_id',
                all: [],
                relationship: 'offices',
                selected: '',
                types: [],
                relation: 'companies',
                relations: [
                    { path: 'employees(division_id)', relation: [] },
                    {
                        path: 'divisions_departments(division_id)',
                        relation: [],
                    },
                ],
                fetchFrom: [
                    {
                        path: 'divisions_departments(department_id).division_id',
                        table: 'departments',
                    },
                    {
                        path: 'offices_divisions(office_id).division_id',
                        table: 'offices',
                    },
                ],
            },
            offices: {
                name: 'offices',
                id: 'office_id',
                all: [],
                selected: '',
                relationship: 'companies',
                types: [],
                relations: [
                    { path: 'offices_divisions(office_id)', relation: [] },
                    { path: 'employees(office_id)', relation: [] },
                ],
                fetchFrom: [
                    {
                        path: 'offices_divisions(division_id).office_id',
                        table: 'divisions',
                    },
                    {
                        path: 'companies_offices(company_id).office_id',
                        table: 'companies',
                    },
                ],
            },
            groups: {
                name: 'groups',
                id: 'group_id',
                all: [],
                relation: 'departments',
                selected: '',
                relationship: 'departments',
                types: [],
                relations: [{ path: 'employees(group_id)', relation: [] }],
                fetchFrom: [
                    {
                        path: 'departments_groups(department_id).group_id',
                        table: 'departments',
                    },
                    {
                        path: 'departments_groups(department_id).group_id',
                        table: 'departments',
                    },
                ],
            },
        },
        image: {
            file: null,
            result: '',
            buttonIsPressed: false,
        },
        alert: {
            showAlert: false,
            showMessage: null,
            message: {
                404: 'Kažkas nutiko, pabandykite dar kartą',
                400: 'Neteisingas elektroninis paštas arba slaptažodis',
                405: 'Jums leidimas tokiam veiksmui nėra duotas',
            },
        },
        dialog: {
            show: false,
            screen: '',
        },
        paginate: {
            currentPage: 0,
            sizeOfPaginate: 5,
            options: [5, 10, 25, 50, 100],
        },
    }),
    getters: {
        user: (state) => state.user,
        adminRoles: (state) => state.adminState.permissions,
        admin: (state) => state.adminState.admin,
        messageIsSubmitted: (state) => state.Message.submitted,
        navBar: (state) => state.navBar,
        company: (state) => state.Company.company,
        companyDetails: (state) => state.details,
        messageTexts: (state) => state.Message.messageTexts,
        office: (state) => state.office,
        image: (state) => state.image,
        alert: (state) => state.alert,
        dialog: (state) => state.dialog,
        message: (state) => state.Message.message,
        employees: (state) => state.employees,
        sizeOfPaginate: (state) => state.paginate.sizeOfPaginate,
        currentPage: (state) => state.paginate.currentPage,
    },
    actions: {
        FETCH_ROLES: vi.fn(),
        SUBMIT_MESSAGE: vi.fn(),
        UPDATE_ADMIN: vi.fn(),
        DISMISS_DIALOG({ commit }) {
            commit('REMOVE_DIALOG')
        },
        AUTH_WITH_TOKEN: vi.fn(),
        FETCH_ADMINS: vi.fn(),
        FETCH_ALL_COMPANIES: vi.fn(),
        FETCH_COMPANIES: vi.fn(),
        SUBMIT_MESSAGE({ commit }) {
            commit('SET_TO_SUBMIT_MESSAGE', true)
        },
        POST_OFFICE: vi.fn(),
        FETCH_OFFICES: vi.fn(),
        RESET_PASSWORD: vi.fn(),
        SHOW_MESSAGE: vi.fn(),
    },
    mutations: {
        REMOVE_EMPLOYEE: (state) => {
            let { employee } = EmployeeState()
            for (let key in employee) {
                state.employee[key] = employee[key]
            }
        },
        SET_TO_SUBMIT_MESSAGE(state, show) {
            state.Message.submitted = show
        },
        SET_IMAGE_BUTTON_PRESSED(state) {
            state.image.result = 'result'
        },
        REMOVE_IMAGE(state) {
            for (let value in state.image) {
                state.image[value] = null
            }
        },
        SET_TO_NEXT_PAGE(state) {
            state.paginate.currentPage = state.paginate.currentPage + 1
        },
        SET_TO_PREVIUOS_PAGE(state) {
            state.paginate.currentPage = state.paginate.currentPage - 1
        },
        REMOVE_DIALOG(state) {
            state.dialog.show = false
        },
        REMOVE_USER: vi.fn(),
    },
})
