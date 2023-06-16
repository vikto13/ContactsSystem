import jwt_decode from "jwt-decode";

export async function authenticate({ next, store }) {

    let haveToken = store.getters.user.token
    let data = JSON.parse(localStorage.getItem('pocketbase_auth'))
    try {
        let { model, token } = data
        if (!haveToken && token) {
            await store.dispatch("authWithToken", { id: model.id, token, password: '', passwordConfirm: '' })
        }
    } catch {
        data && store.commit("setUser", { token: data.token, ...data.model })
    }
    return next()
}

export function needsAuth({ next, store }) {
    let haveToken = store.getters.user.token
    if (haveToken) {
        return next()
    }
    return next({ path: `/users/auth-with-password` });

}

export async function checkContact({ next, to, store }) {
    try {
        await store.dispatch("findAndExpandEmployee", to.params.id);
        return next()
    } catch (error) {
        if (error.status == 404) {
            return next({ path: "notFound" })
        }
    }
}

export function verifyToken({ next, to }) {
    try {
        jwt_decode(to.params.token)
        return next()
    } catch {
        return next({ name: "notFound" })
    }
}

export function readAdmins({ next, store }) {
    if (store.getters.user.token && store.getters.user.permissions_id.read_permissions) {
        return next()
    }
    return next({ path: `/admins/login` });
}

export function pathForCompany({ next, to }) {
    if ([
        'companies',
        'groups',
        'departments',
        'divisions'
    ].includes(to.params.id)) {
        return next()
    }
    return next({ name: "notFound" })
}

export function pathForRelation({ next, to }) {
    if ([
        'divisions',
        'departments',
        'groups'
    ].includes(to.params.id)) {
        return next()
    }
    return next({ name: "notFound" })
}