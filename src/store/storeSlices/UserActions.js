import { pocketBase } from "../../../services/pocketBase";
import { UserState } from "../initState/UserState";
import axios from "axios";
import { expanding } from "./expandAction";

export default {
    state: UserState(),
    mutations: {
        setUser(state, record) {
            for (let user in state.user) {
                state.user[user] = record[user]
            }
        },
        clearUserData(state) {
            let userState = UserState()
            for (let user in userState.user) {
                state.user[user] = userState.user[user]
            }
        },
        setUserImageUrl(state, image) {
            state.user.avatarUrl = image
        }
    },
    actions: {
        async authWithPassword({ commit, dispatch, state }) {
            console.log(state)
            const data = await pocketBase.collection(state.collectionName).authWithPassword(
                state.user.email,
                state.user.password, {}, { expand: "permissions_id" });
            await commit("setUser", { ...expanding(data.record), token: data.token, password: '', passwordConfirm: '' })
            await dispatch("setUserAvatar")
        },
        async authWithToken({ commit, dispatch }) {
            const { record, token } = await pocketBase.collection('users').authRefresh({}, { expand: "permissions_id" });
            await commit("setUser", { ...expanding(record), token: token })
            await dispatch("setUserAvatar")
        },
        async setUserAvatar({ commit, state }) {

            if (state.user.avatar) {
                let image = await axios.get(
                    `${import.meta.env.VITE_POCKET_BASE_URL}/api/files/users/${state.user.id
                    }/${state.user.avatar}?thumb=100x300`,
                    { responseType: "blob" }
                );
                let avatar = new FileReader();
                avatar.readAsDataURL(image.data);
                commit("setUserImageUrl", avatar)
            }

        },
        async resetPassword({ state }) {
            await pocketBase.collection(state.collectionName).requestPasswordReset(state.user.email)
        },
        async changePassword({ state }, { token }) {
            await pocketBase.collection(state.collectionName).confirmPasswordReset({ token, password: state.user.password, passwordConfirm: state.user.passwordConfirm });
        }
    },
    getters: {
        user: (state) => state.user
    }
}