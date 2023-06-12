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
                relation: null,
                selected: '',
                types: [],
                relations: [
                    { path: "companies_offices(office_id)", relation: [] },
                    { path: "employees(company_id)", relation: [] },
                ],


                fetchFrom: [
                    { path: "companies_offices(office_id).company_id", table: 'offices' }
                ]














            },
            departments: {
                name: 'departments',
                id: "department_id",
                all: [],
                relationship: 'divisions',

                relation: 'divisions',
                selected: '',
                types: [],
                relations: [
                    { path: "employees(department_id)", relation: [] },
                ],
                fetching: [
                    "divisions_departments(division_id).department_id",
                ],

                fetchFrom: [
                    { path: "departments_groups(group_id).department_id", table: 'groups' },
                    { path: "divisions_departments(division_id).department_id", table: 'divisions' },
                ]

            },
            divisions: {
                name: 'divisions',
                id: "division_id",
                all: [],
                relationship: 'offices',
                selected: '',
                types: [],

                relation: 'companies',

                relations: [
                    { path: "employees(division_id)", relation: [] },
                    { path: "offices_divisions(division_id)", relation: [] },
                ],


                fetching: [
                    "companies_offices(company_id).office_id",
                    "offices_divisions(office_id).division_id",
                ],

                fetchFrom: [
                    { path: 'divisions_departments(department_id).division_id', table: 'departments' },
                    { path: "offices_divisions(office_id).division_id", table: 'offices' },

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
                ],
                fetching: [
                    { path: "companies_offices(company_id).office_id", relate: 'offices', table: 'companies' },
                    { path: "offices_divisions(office_id).division_id", relate: 'divisions', table: 'offices' }
                ],



                fetchFrom: [

                    { path: 'offices_divisions(division_id).office_id', table: 'divisions' },
                    { path: "companies_offices(company_id).office_id", table: 'companies' },
                ]





            },
            groups: {
                name: 'groups',
                id: "group_id",
                all: [],


                relation: 'departments',

                selected: '',
                relationship: 'departments',
                types: [],
                relations: [
                    { path: "employees(group_id)", relation: [] },
                ],
                fetching: [
                    "departments_groups(department_id).group_id",

                ],

                fetchFrom: [
                    { path: 'departments_groups(department_id).group_id', table: 'departments' },
                    { path: 'departments_groups(department_id).group_id', table: 'departments' }
                ]
            },
        }
    }
}