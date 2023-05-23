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

export const router = new VueRouter({
    routes: [
        {
            path: '/admins/records',
            component: Admins
        },
        {
            path: '/users/records',
            component: Contacts
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
            path: '/relationship/record',
            component: Relationship,
        },
        {
            path: '/offices/records',
            component: Offices
        },
        {
            path: '/:id/records',
            component: Companies,
            props: true,
            beforeEnter: (to, from, next) => {
                const { id } = to.params;
                if (id == 'companies' || id == 'divisions' || id == "groups" || id == "departaments") {
                    return next({ path: to })
                }

                return next({ path: "./" })
            }
            // meta: {
            //     needsAuth: true
            // }
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