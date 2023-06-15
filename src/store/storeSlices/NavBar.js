export default {
    state: {
        navBar: {
            contacts: {
                title: "Kontaktai",
                path: "/",
                detailedText: "Detalesnė kontakto informacija",
                systemText: 'Kontaktų sistema',
                textEmpty: "Nėra sukurtų kontaktų",
            },
            relationship: {
                title: "Struktūros",
                path: "/relationship/record/divisions",
                textEmpty: "Nėra sukurtų struktūrų",
            },
            companies: {
                what: "įmonę",
                whose: "Įmonės",
                textAdd: "Pridėti naują įmonę",
                textEmpty: "Nėra pridėta įmonių",
                title: 'Įmonė',
                path: "/companies/records"
            },
            divisions: {
                what: "diviziją",
                whose: "Divizijos",
                textAdd: "Pridėti naują diviziją",
                textEmpty: "Nėra pridėta divizijų",
                title: 'Divizija',
            },
            groups: {
                what: "grupę",
                whose: "Grupės",
                textAdd: "Pridėti naują grupę",
                textEmpty: "Nėra pridėta grupių",
                title: 'Grupė'
            },
            departments: {
                what: "departamentą",
                whose: "Departamentai",
                textAdd: "Pridėti naują departamentą",
                textEmpty: "Nėra pridėta departamentų",
                title: 'Departamentai',
                path: 'departments'
            },
            offices: {
                title: 'Ofisai',
                textAdd: "Pridėti naują ofisą",
                textEmpty: "Nėra sukurtų ofisų",
                path: "/offices/records",
                what: "ofisą",
                whose: "Ofiso",
            },
            admins: {
                id: 'admins',
                textCreate: 'Sukurti admin paskyrą',
                textEmpty: 'Nėra sukurtų admino paskyrų',
                title: "Paskyros",
                path: "/admins/records",
                loginPath: "/admins/login"
            },
            employees: {
                title: 'Darbuotoju'
            }
        }
    },
    getters: {
        navBar: (state) => state.navBar
    }
}