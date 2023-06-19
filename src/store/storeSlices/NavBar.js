export default {
    state: {
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
    },
    getters: {
        navBar: (state, { user }) => {
            for (let navBar in state.navBar) {
                let { permissions } = state.navBar[navBar]
                if (permissions) {
                    ;(state.navBar[navBar]['show'] =
                        user.permissions_id &&
                        permissions
                            .map((name) => user.permissions_id[name])
                            .includes(true)),
                        navBar
                }
            }
            return state.navBar
        },
    },
}
