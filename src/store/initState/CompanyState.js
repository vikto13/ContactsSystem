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
                title: 'Įmonė',
                all: [],
                selected: ''
            },
            divisions: {
                id: "divisions",
                what: "diviziją",
                whose: "divizijos",
                addText: "Pridėti naują diviziją",
                emptyText: "Nėra pridėta divizijų",
                title: 'Divizija',
                all: [],
                relationship: 'companies',
                selected: ''
            },
            groups: {
                id: "groups",
                what: "grupę",
                whose: "grupės",
                addText: "Pridėti naują grupę",
                emptyText: "Nėra pridėta grupių",
                title: 'Grupė',
                all: [],
                relationship: 'departments',
                selected: ''
            },
            departments: {
                id: "departments",
                what: "departamentą",
                whose: "departamentai",
                addText: "Pridėti naują departamentą",
                emptyText: "Nėra pridėta departamentų",
                title: 'Departamentai',
                all: [],
                relationship: 'divisions',
                selected: ''
            },
            office: {
                id: "office",
                what: "ofisą",
                whose: "ofisai",
                addText: "Pridėti naują ofisą",
                emptyText: "Nėra pridėta ofisų",
                title: 'Adresus',
                all: [],
                selected: ''
            },
        }
    }


}