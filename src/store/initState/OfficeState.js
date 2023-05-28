export function OfficeState() {

    return {
        offices: [],
        office: {
            id: null,
            name: '',
            street: '',
            country: '',
            city: '',
            street_number: null,
            expand: null,
            selectedNames: []
        }
    }

}