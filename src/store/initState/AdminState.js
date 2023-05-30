export function AdminState() {
    return {
        roles: [],
        admin: {
            name: '',
            email: '',
            phone_number: '',
            roles: [],
            whatDo: null,
            id: null,
            password: '',
            passwordConfirm: ''
        },
        admins: [],
        pages: {
            "authLogin": "auth-with-password",
            "authRefresh": "auth-refresh",
        },
    }
}
