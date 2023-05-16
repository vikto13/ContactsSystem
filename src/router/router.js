import VueRouter from "vue-router";
import Contacts from "../views/Contacts.vue"
import ContactDetails from "../views/ContactDetails.vue"
import Login from "../views/Login.vue"

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Contacts
        },
        {
            path: '/contact/:id',
            component: ContactDetails
        }, {
            path: '/users/auth-with-password',
            component: Login

        }
    ]
})