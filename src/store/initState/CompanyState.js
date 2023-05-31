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
                all: null,
                selected: ''
            },
            divisions: {
                id: "divisions",
                all: null,
                relationship: 'companies',
                selected: ''
            },
            groups: {
                id: "groups",
                all: null,
                relationship: 'departments',
                selected: ''
            },
            departments: {
                id: "departments",
                all: null,
                relationship: 'divisions',
                selected: ''
            },
            office: {
                id: "office",
                all: null,
                selected: ''
            },
        }
    }


}