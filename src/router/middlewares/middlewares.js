import jwt_decode from 'jwt-decode'
export async function authenticate({ next, store }) {
    let haveToken = store.getters.user.token
    let data = JSON.parse(localStorage.getItem('pocketbase_auth'))
    try {
        let { model, token } = data
        if (!haveToken && token) {
            await store.dispatch('AUTH_WITH_TOKEN', {
                id: model.id,
                token,
                password: '',
                passwordConfirm: '',
            })
        }
    } catch (err) {
        data &&
            (await store.commit('SET_USER', {
                token: data.token,
                ...data.model,
            }))
    }
    return next()
}

export function needsAuth({ next, store }) {
    let haveToken = store.getters.user.token
    if (haveToken) {
        return next()
    }
    return next({ path: `/admin/login` })
}

export async function checkContact({ next, to, store }) {
    try {
        await store.dispatch('FIND_AND_EXPAND_EMPLOYEE', to.params.id)
        return next()
    } catch (error) {
        if (error.status == 404) {
            return next({ path: 'notFound' })
        }
    }
}

export function verifyToken({ next, to }) {
    try {
        jwt_decode(to.params.token)
        return next()
    } catch {
        return next({ name: 'notFound' })
    }
}

export function readAdmins({ next, store }) {
    if (
        store.getters.user.token &&
        store.getters.user.permissions_id.read_permissions
    ) {
        return next()
    }
    return next({ path: `/admin/login` })
}

export function pathForRelation({ next, to }) {
    if (['divisions', 'departments', 'groups'].includes(to.params.id)) {
        return next()
    }
    return next({ name: 'notFound' })
}

export function needsPermission({ next, to, store }) {
    if (!store.getters.navBar[to.path.split('/')[1]].show) {
        return next({ name: 'notFound' })
    }
    return next()
}
