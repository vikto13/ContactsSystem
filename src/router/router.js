import VueRouter from "vue-router";
import Contacts from "../views/Contacts.vue"
import ContactDetails from "../views/ContactDetails.vue"
import Login from "../views/Login.vue"
import Companies from "../views/Companies.vue"
export const router = new VueRouter({
    routes: [
        {
            path: '/users/records',
            component: Contacts
        },
        {
            path: '/companies/records',
            component: Companies
        },
        {
            path: '/contact/:id',
            component: ContactDetails
        },
        {
            path: '/users/:info',
            component: Login,
            props: true,

        }
    ]
})