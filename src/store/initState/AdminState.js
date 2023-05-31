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
            passwordConfirm: '',
            emailVisibility: true,
            username: null
        },
        admins: [],
    }
}
