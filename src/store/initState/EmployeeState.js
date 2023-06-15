export function EmployeeState() {
    return {
        employees: [],
        employee: {
            id: null,
            name: "",
            surname: "",
            email: "",
            position: "",
            phone_number: "",
            company_id: "",
            division_id: "",
            department_id: "",
            group_id: "",
            office_id: "",
            photo: null
        },
        filteredEmployees: [],
        collectionName: "employees",
        contactSearch: ""
    }
}