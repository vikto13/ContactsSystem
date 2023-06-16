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
                what: "Padaliniai",
                whose: "Padalinius",
                textAdd: "Pridėti naują padalinį",
                textEmpty: "Nėra pridėta padalinių",
                title: 'Padaliniai',
            },
            groups: {
                what: "grupę",
                whose: "Grupės",
                textAdd: "Pridėti naują grupę",
                textEmpty: "Nėra pridėta grupių",
                title: 'Grupė'
            },
            departments: {
                what: "skyrių",
                whose: "Skyrius",
                textAdd: "Pridėti naują skyrių",
                textEmpty: "Nėra pridėta skyriaus",
                title: 'Skyriai',
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