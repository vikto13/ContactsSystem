import { pocketBase } from "../../../services/pocketBase";
import { UserState } from "../initState/UserState";
import axios from "axios";

export default {
    state: UserState,
    mutations: {
        setUser(state, record) {
            for (let user in state) {
                state[user] = record[user]
            }
        },
        clearUserData(state) {
            for (let user in state) {
                state[user] = null
            }
        },
        setImage(state, image) {
            state.avatar = image
        }
    },
    actions: {
        async authWithPassword({ commit, dispatch }, user) {
            const data = await pocketBase.collection('users').authWithPassword(
                user.email,
                user.password);
            await commit("setUser", { ...data.record, token: data.token })
            await dispatch("setUserAvatar")
        },
        async authWithToken({ commit, dispatch }, user) {
            let { data } = await axios.get(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/users/records/${user.id}`, { headers: { Authorization: `Bearer ${user.token}` } })
            console.log(data)

            await commit("setUser", { ...data, token: user.token })
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
            await pocketBase.collection('users').requestPasswordReset(state.email)
        },
        async changePassword(_, { token, password, passwordConfirm }) {
            await pocketBase.collection('users').confirmPasswordReset({ token, password, passwordConfirm });
        }
    },
    getters: {
        user: (state) => ({ ...state })
    }
}