export default {
    state: {
        navBar: {
            contacts: {
                title: "Kontaktai",
                path: "/employee/records",
                detailedText: "Detalesnė kontakto informacija",
                systemText: 'Kontaktų sistema',
                textEmpty: "Nėra sukurtų kontaktų",
            },
            relationship: {
                title: "Struktūra",
                path: "/relationship/record",
                textEmpty: "Nėra sukurtų struktūrų",
            },
            companies: {
                what: "kompaniją",
                whose: "Kompanijos",
                textAdd: "Pridėti naują kompaniją",
                textEmpty: "Nėra pridėta kompanijų",
                title: 'Įmonė',
                path: "/users/companies"
            },
            divisions: {
                what: "diviziją",
                whose: "divizijos",
                textAdd: "Pridėti naują diviziją",
                textEmpty: "Nėra pridėta divizijų",
                title: 'Divizija',
            },
            groups: {
                what: "grupę",
                whose: "grupės",
                textAdd: "Pridėti naują grupę",
                textEmpty: "Nėra pridėta grupių",
                title: 'Grupė'
            },
            departments: {
                what: "departamentą",
                whose: "departamentai",
                textAdd: "Pridėti naują departamentą",
                textEmpty: "Nėra pridėta departamentų",
                title: 'Departamentai',
                path: 'departments'
            },
            offices: {
                title: 'Ofisai',
                textAdd: "Pridėti naują ofisą",
                textEmpty: "Nėra sukurtų ofisų",
                path: "/offices/records"
            },
            admins: {
                id: 'admins',
                textCreate: 'Sukurti admin paskyrą',
                textEmpty: 'Nėra sukurtų admino paskyrų',
                title: "Paskyros",
                path: "/admins/records",
                loginPath: "/users/auth-with-password"
            }
        }
    },
    getters: {
        navBar: (state) => state.navBar
    }
}