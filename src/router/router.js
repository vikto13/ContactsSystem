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
import { pocketBase } from "../../services/pocketBase";
import axios from "axios";

import jwt_decode from "jwt-decode";

export const router = new VueRouter({
    routes: [
        {
            path: '/admins/records',
            component: Admins,
            meta: {
                needsAuth: true
            }
        },
        {
            path: '/contact/:id',
            component: ContactDetails,
            props: true
        },
        {
            path: '/relationship/record',
            component: Relationship,
            meta: {
                needsAuth: true
            }
        },
        {
            path: '/offices/records',
            component: Offices,
            meta: {
                needsAuth: true
            }
        },
        {
            path: '/contacts/records',
            component: Contacts,
            meta: {
                needsAuth: true
            }
        },
        {
            path: '/users/',
            name: 'users',
            component: Login,
            children: [
                {
                    path: initializeStore.modules.Admin.state.pages.updatePassword,
                    component: RemindPassword

                },
                {
                    path: initializeStore.modules.Admin.state.pages.authLogin,
                    component: AdminLogin

                },
                {
                    path: initializeStore.modules.Admin.state.pages.updatePassword,
                    component: UpdatePassword

                }
            ]
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

                return next({ path: "notFound" })
            },
            meta: {
                needsAuth: true
            }
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})



router.beforeEach(async (to, from, next) => {

    // if (to.meta.needsAuth) {
    try {
        let { token } = initializeStore.modules.User.state
        let { id } = jwt_decode(token)

        await initializeStore.modules.User.actions.authWithToken({ id, token })


        // console.log(Jwt.verify(token))
    } catch {
        //return next({ path: `/users/${initializeStore.modules.Admin.state.pages.authLogin}` })
    }
    // }

    next()
})