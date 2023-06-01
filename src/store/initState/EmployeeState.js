export function EmployeeState() {
    return {
        employees: [],
        employee: {
            id: null,
            name: "",
            surname: "",
            email: "",
            phone_number: "",
            company_id: null,
            division_id: null,
            department_id: null,
            group_id: null,
            photo: null
        },
        collectionName: "employees",
        contactSearch: ""
    }
}