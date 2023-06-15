export function OfficeState() {
    return {
        offices: null,
        office: {
            name: '',
            id: null,
            street: '',
            country: '',
            city: '',
            street_number: null,
            expand: null,
            company: [],
            savedCompanies: []
        },
        collectionName: 'offices'
    }

}