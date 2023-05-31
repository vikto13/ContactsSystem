import VueRouter from "vue-router";
import Contacts from "../views/Contacts.vue"
import ContactDetails from "../views/ContactDetails.vue"
import Login from "../views/Login.vue"
import Companies from "../views/Companies.vue"
import { initializeStore } from "../store/initializeStore"
import NotFound from "../views/NotFound.vue"
import Admins from "../views/Admins.vue"
import Relationship from "../views/Relationship.vue"
import Offices from "../views/Offices.vue"
import AdminLogin from "../components/AdminLogin.vue"
import RemindPassword from "../components/RemindPassword.vue";
import UpdatePassword from "../components/UpdatePassword.vue";
import { store } from "../main";
import middlewarePipeline from "./middlewares/middlewarePipeline"
import { authenticate, needsAuth, checkContact, isCategory, verifyToken } from "./middlewares/middlewares"

export const router = new VueRouter({
    routes: [
        {
            path: '/admins/records',
            component: Admins,
            meta: {
                middleware: [
                    authenticate,
                    needsAuth
                ]
            }
        },
        {
            path: '/auth-update-password/:token',
            component: UpdatePassword,
            props: true,
            meta: {
                middleware: [
                    verifyToken
                ]
            }
        },
        {
            path: '/contact/:id',
            component: ContactDetails,
            props: true,
            meta: {
                middleware: [
                    checkContact,
                    authenticate,
                    needsAuth
                ]
            }
        },
        {
            path: '/relationship/record',
            component: Relationship,
            meta: {
                middleware: [
                    authenticate,
                    needsAuth
                ]
            }
        },
        {
            path: '/offices/records',
            component: Offices,
            meta: {
                middleware: [
                    authenticate,
                    needsAuth
                ]
            }
        },
        {
            path: '/contacts/records',
            component: Contacts,
            meta: {
                middleware: [
                    authenticate,
                ]
            }
        },
        {
            path: '/users/',
            name: 'users',
            component: Login,
            children: [
                {
                    path: "auth-refresh",
                    component: RemindPassword,

                },
                {
                    path: "auth-with-password",
                    component: AdminLogin

                },
            ]
        },
        {
            path: '/companies/records',
            component: Companies,
            meta: {
                middleware: [
                    authenticate,
                    needsAuth
                ]
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const { middleware } = to.meta

    const context = {
        to, from, next, store
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
});


