import jwt_decode from "jwt-decode";

export async function authenticate({ next, store }) {
    let haveToken = store.getters.user.token
    try {
        let { model, token } = JSON.parse(localStorage.getItem('pocketbase_auth'))
        if (!haveToken && token) {
            await store.dispatch("authWithToken", { id: model.id, token })
        }
    } catch { }
    return next()
}

export function needsAuth({ next, store }) {
    let haveToken = store.getters.user.token
    if (haveToken) {
        return next()
    } else {
        return next({ path: `/users/auth-with-password` });
    }
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

export function isCategory({ next, to, store }) {
    const { id } = to.params;
    if (id == 'companies' || id == 'divisions' || id == "groups" || id == "departaments") {
        return next()
    } else {
        return next({ name: "notFound" })
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