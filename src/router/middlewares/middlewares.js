import jwt_decode from "jwt-decode";

export async function authenticate({ next, store }) {

    let haveToken = store.getters.user.token

    try {
        let data = localStorage.getItem('pocketbase_auth')
        if (!data) {
            throw null;
        }

        let { model, token } = JSON.parse(data)
        if (!haveToken && token) {
            await store.dispatch("authWithToken", { id: model.id, token })
        }
    } catch (err) { console.log(err) }
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

export function verifyToken({ next, to, store }) {
    try {
        jwt_decode(to.params.token)
        return next()
    } catch {
        return next({ name: "notFound" })
    }
}

export function forAdmins({ next, to, store }) {
    console.log(store.getters.user.username)
    if (store.getters.user.username === 'admin') {
        return next()
    }
    return next({ path: `/users/auth-with-password` });
}

export function pathForCompany({ next, to, store }) {
    try {
        console.log(store)
        return next()
    } catch {
        return next({ name: "notFound" })
    }
}