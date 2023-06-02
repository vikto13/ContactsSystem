export function AdminState() {
    return {
        roles: [],
        admin: {
            name: '',
            email: '',
            permissions_id: null,
            whatDo: null,
            id: null,
            password: '',
            passwordConfirm: '',
            emailVisibility: true,
            username: null,
            roles: []
        },
        admins: [],
        collectionName: 'users',
        permissions: {
            edit_employees: "Redaguoti ir kurti kontaktus",
            delete_employees: "Trinti kontaktus",
            edit_offices: "Redaguoti ir kurti įmones",
            delete_offices: "Trinti įmones",
            edit_structure: "Redaguoti ir kurti struktūras",
            delete_structure: "Trinti struktūras",
            read_permissions: "Skaityti admin paskyras",
            edit_permissions: "Redaguoti ir kurti administracines teises ",
            delete_permissions: "Trinti admin paskyras",
            edit_companies: "Redaguoti ir kurti būstines",
            delete_companies: "Trinti būstines"
        }
    }
}
