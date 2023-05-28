export function CompanyState() {
    return {
        company: {
            name: '',
            id: null,
            collectionName: '',
            relation: ''
        },

        details: {
            companies: {
                id: "companies",
                what: "kompaniją",
                whose: "kompanijos",
                addText: "Pridėti naują kompaniją",
                emptyText: "Nėra pridėta kompanijų",
                path: "#/companies/records",
                title: 'Įmonė',
                all: [],

            },
            divisions: {
                id: "divisions",
                what: "diviziją",
                whose: "divizijos",
                addText: "Pridėti naują diviziją",
                emptyText: "Nėra pridėta divizijų",
                path: "#/divisions/records",
                title: 'Divizija',
                all: [],
                relationship: 'companies'
            },
            groups: {
                id: "groups",
                what: "grupę",
                whose: "grupės",
                addText: "Pridėti naują grupę",
                emptyText: "Nėra pridėta grupių",
                path: "#/groups/records",
                title: 'Grupė',
                all: [],
                relationship: 'departments'
            },
            departments: {
                id: "departments",
                what: "departamentą",
                whose: "departamentai",
                addText: "Pridėti naują departamentą",
                emptyText: "Nėra pridėta departamentų",
                path: "#/departments/records",
                title: 'Departamentai',
                all: [],
                relationship: 'divisions'
            },
        }
    }


}