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
const { pages: adminPages } = initializeStore.modules.Admin.state
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
                    path: adminPages.authRefresh,
                    component: RemindPassword

                },
                {
                    path: adminPages.authLogin,
                    component: AdminLogin

                },
                {
                    path: adminPages.updatePassword,
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
    if (to.meta.needsAuth) {
        try {
            let { token } = initializeStore.modules.User.state
            var decoded = jwt_decode(token)
            console.log(decoded)
            // // await axios.post(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/confirm-verification`, {
            // //     token
            // // })

            // console.log(Jwt.verify(token))
        } catch {
            return next({ path: `/users/${adminPages.authLogin}` })
        }
    }

    next()
})