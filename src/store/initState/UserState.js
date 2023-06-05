export function UserState() {
    return {
        user: {
            id: null,
            username: "",
            verified: null,
            emailVisibility: null,
            email: "",
            name: "",
            avatar: "",
            token: null,
            permissions_id: null,
            password: '',
            passwordConfirm: '',
            avatarUrl: ''

        },
        collectionName: "users"
    }
}