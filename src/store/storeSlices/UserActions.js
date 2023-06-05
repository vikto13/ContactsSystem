import { pocketBase } from "../../../services/pocketBase";
import { UserState } from "../initState/UserState";
import axios from "axios";

export default {
    state: UserState,
    mutations: {
        setUser(state, record) {
            for (let user in state.user) {
                state.user[user] = record[user]
            }
        },
        clearUserData(state) {
            for (let user in state.user) {
                state.user[user] = null
            }
        },
        setImage(state, image) {
            state.user.avatar = image
        }
    },
    actions: {
        async authWithPassword({ commit, dispatch, state }, user) {
            const data = await pocketBase.collection(state.collectionName).authWithPassword(
                user.email,
                user.password);
            await commit("setUser", { ...data.record, token: data.token })
            await dispatch("setUserAvatar")
        },
        async authWithToken({ commit, dispatch }, user) {
            console.log(user)
            // let image = await axios.post(
            //     `${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/auth-refresh`,
            //     {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2ODcxNTMzNjMsImlkIjoidWx6YWlxa2U4eDB4ZGkxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.h_4PhzRZYcPTZDH5ebG8qKvweeu6sPtXxnpIXjwQHf0`
            //         }
            //     }
            // );

            const { record, token } = await pocketBase.collection('users').authRefresh({ expand: "permissions_id" });
            // console.log(record)

            await commit("setUser", { ...record, token: token })
            await dispatch("setUserAvatar")
        },
        async setUserAvatar({ commit, state }) {
            if (state.avatar) {
                let image = await axios.get(
                    `${import.meta.env.VITE_POCKET_BASE_URL}/api/files/users/${state.id
                    }/${state.avatar}?thumb=100x300`,
                    { responseType: "blob" }
                );
                let avatar = new FileReader();
                avatar.readAsDataURL(image.data);
                commit("setImage", avatar)
            }

        },
        async resetPassword({ state }) {
            await pocketBase.collection(state.collectionName).requestPasswordReset(state.user.email)
        },
        async changePassword({ state }, { token, password, passwordConfirm }) {
            await pocketBase.collection(state.collectionName).confirmPasswordReset({ token, password, passwordConfirm });
        }
    },
    getters: {
        user: (state) => state.user
    }
}