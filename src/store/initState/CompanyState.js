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
                all: [],
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
                all: [],
                relationship: 'divisions',
                selected: '',
                types: [],
                relations: [
                    { path: "employees(department_id)", relation: [] },
                ]
            },
            divisions: {
                name: 'divisions',
                id: "division_id",
                all: [],
                relationship: 'offices',
                selected: '',
                types: [],
                relations: [
                    { path: "employees(division_id)", relation: [] },
                    { path: "offices_divisions(division_id)", relation: [] },
                ]
            },
            offices: {
                name: 'offices',
                id: "office_id",
                all: [],
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
                all: [],
                selected: '',
                relationship: 'departments',
                types: [],
                relations: [
                    { path: "employees(group_id)", relation: [] },
                ]

            },
        }
    }
}