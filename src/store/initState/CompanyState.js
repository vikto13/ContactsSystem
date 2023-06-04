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
                name: 'companies',
                id: "company_id",
                all: null,
                relationship: 'offices',
                selected: '',
                types: [],
                relations: [
                    { path: "companies_offices(office_id)", relation: [] },
                    { path: "employees(company_id)", relation: [] },

                ]
            },
            departments: {
                name: 'departments',
                id: "department_id",
                all: null,
                relationship: 'divisions',
                selected: '',
                types: []
            },
            divisions: {
                name: 'divisions',
                id: "division_id",
                all: null,
                relationship: 'offices',
                selected: '',
                types: []
            },
            offices: {
                name: 'offices',
                id: "office_id",
                all: null,
                selected: '',
                relationship: 'companies',
                types: [],
                relations: [
                    { path: "companies_offices(office_id)", relation: [] },
                    { path: "offices_divisions(office_id)", relation: [] },
                    { path: "employees(office_id)", relation: [] }
                ]
            },
            groups: {
                name: 'groups',
                id: "group_id",
                all: null,
                selected: '',
                relationship: 'departments',
                types: []

            },





        }
    }


}