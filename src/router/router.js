import VueRouter from "vue-router";
import Contacts from "../views/Contacts.vue"

export const router = new VueRouter({
    routes: [
        // {
        //     path: '/admins/records',
        //     component: Admins,
        //     meta: {
        //         middleware: [
        //             authenticate,
        //             needsAuth
        //         ]
        //     }
        // },
        // {
        //     path: '/auth-update-password/:token',
        //     component: UpdatePassword,
        //     props: true,
        //     meta: {
        //         middleware: [
        //             verifyToken
        //         ]
        //     }
        // },
        // {
        //     path: '/contact/:id',
        //     component: ContactDetails,
        //     props: true,
        //     meta: {
        //         middleware: [
        //             checkContact,
        //             authenticate,
        //             needsAuth
        //         ]
        //     }
        // },
        // {
        //     path: '/relationship/record',
        //     component: Relationship,
        //     meta: {
        //         middleware: [
        //             authenticate,
        //             needsAuth
        //         ]
        //     }
        // },
        // {
        //     path: '/offices/records',
        //     component: Offices,
        //     meta: {
        //         middleware: [
        //             authenticate,
        //             needsAuth
        //         ]
        //     }
        // },
        {
            path: '/employee/records',
            component: Contacts,
            // meta: {
            //     middleware: [
            //         authenticate,
            //     ]
            // }
        },
        // {
        //     path: '/users/',
        //     name: 'users',
        //     component: Login,
        //     children: [
        //         {
        //             path: "auth-refresh",
        //             component: RemindPassword,

        //         },
        //         {
        //             path: "auth-with-password",
        //             component: AdminLogin

        //         },
        //     ]
        // },
        // {
        //     path: '/companies/records',
        //     component: Companies,
        //     meta: {
        //         middleware: [
        //             authenticate,
        //             needsAuth
        //         ]
        //     }
        // },
        // {
        //     path: '*',
        //     name: 'notFound',
        //     component: NotFound
        // }
    ]
})

// router.beforeEach(async (to, from, next) => {
//     if (!to.meta.middleware) {
//         return next()
//     }
//     const { middleware } = to.meta

//     const context = {
//         to, from, next, store
//     }

//     return middleware[0]({
//         ...context,
//         next: middlewarePipeline(context, middleware, 1)
//     })
// });


