import VueRouter from "vue-router";
import Contacts from "../views/Contacts.vue"
import ContactDetails from "../views/ContactDetails.vue"
import Login from "../views/Login.vue"
import Companies from "../views/Companies.vue"
import { initializeStore } from "../store/initializeStore"
import NotFound from "../views/NotFound.vue"
export const router = new VueRouter({
    routes: [
        {
            path: '/users/records',
            component: Contacts
        },
        {
            path: '/companies/records',
            component: Companies,
            // meta: {
            //     needsAuth: true
            // }
        },
        {
            path: '/contact/:id',
            component: ContactDetails
        },
        {
            path: '/users/:info',
            component: Login,
            props: true,

        },
        {
            path: '*',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.needsAuth && !initializeStore.modules.User.state.token) {
        return next({ path: "/users/auth-with-password" })
    }
    next()
})