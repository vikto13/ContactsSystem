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
                id: "companies",
                all: null,
                relationship: 'offices',
                selected: ''
            },
            departments: {
                name: 'departments',
                id: "department_id",
                all: null,
                relationship: 'groups',
                selected: '',
                types: []
            },


            divisions: {
                name: 'divisions',
                id: "division_id",
                all: null,
                relationship: 'departments',
                selected: ''
            },
            offices: {
                name: 'offices',
                id: "office_id",
                all: null,
                selected: '',
                relationship: 'divisions',
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