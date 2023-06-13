<template>
    <ul class="nav nav-fill dialog-box navigation-bar">
        <router-link :to="'/'">
            <img
                id="logo-icon"
                src="../../assets/teltonika_logo.png"
                style="height: 3rem"
                class="m-2"
            />
        </router-link>

        <template>
            <li
                v-for="(tab, index) in [
                    { ...navBar.contacts, show: Boolean(user.token) },
                    { ...navBar.companies, show: Boolean(user.token) },
                    { ...navBar.relationship, show: Boolean(user.token) },
                    { ...navBar.offices, show: Boolean(user.token) },
                    {
                        ...navBar.admins,
                        show: Boolean(
                            user.token && user.permissions_id.edit_permissions
                        ),
                    },
                ]"
                :key="index"
                class="nav-item d-flex flex-row p-3"
            >
                <router-link
                    v-show="tab.show"
                    :to="`${tab.path}`"
                    class="nav-link text-white"
                    :class="'active'"
                    >{{ tab.title }}</router-link
                >
            </li>

            <md-menu v-show="user.token" md-size="medium" md-align-trigger>
                <md-button
                    md-menu-trigger
                    class="md-icon-button md-raised"
                    style="background-color: white !important"
                >
                    <img v-if="user.avatar" :src="image" />
                    <md-icon v-else>person</md-icon>
                </md-button>

                <md-menu-content>
                    <md-menu-item @click="updatePassword"
                        >Pakeisti slaptažodį
                        <md-icon style="color: #414042"
                            >arrow_drop_down</md-icon
                        ></md-menu-item
                    >
                    <md-menu-item @click="signOut">Atsijungti</md-menu-item>
                </md-menu-content>
            </md-menu>
        </template>
    </ul>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { LoginMixin } from '../../views/mixins/LoginMixin'
export default {
    computed: {
        ...mapGetters(['user', 'navBar']),
        image() {
            let showImage = this.user.avatarUrl.result
            return showImage
        },
    },
    mixins: [LoginMixin],
    methods: {
        ...mapActions(['triggerMessage', 'resetPassword', 'showLoading']),
        signOut() {
            setTimeout(() => {
                this.$router.push('/admins/login')
                this.$store.commit('clearUserData')
                localStorage.removeItem('pocketbase_auth')
            }, 500)
        },
    },
}
</script>

<style>
@media only screen and (max-width: 860px) {
    #logo-icon {
        display: none;
    }
}
</style>
