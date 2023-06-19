<template>
    <ul class="nav nav-fill dialog-box navigation-bar" style="flex-shrink: 0">
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
                v-for="(tab, index) in navBarSelections"
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
                    <img v-if="user.avatar" :src="getImage" />
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
        ...mapGetters(['user', 'navBar', 'image']),
        getImage() {
            return `${
                import.meta.env.VITE_POCKET_BASE_URL
            }/api/files/_pb_users_auth_/${this.user.id}/${this.user.avatar}`
        },
        navBarSelections() {
            let show = [
                { ...this.navBar.contacts, show: Boolean(this.user.token) },
                this.navBar.companies,
                this.navBar.relationship,
                this.navBar.offices,
                this.navBar.admins,
            ]
            let filtered = show.filter(({ show }) => show)
            return filtered.length > 1 ? filtered : show
        },
    },
    mixins: [LoginMixin],
    methods: {
        signOut() {
            setTimeout(() => {
                this.$router.push('/admin/login')
                this.$store.commit('clearUserData')
                localStorage.removeItem('pocketbase_auth')
            }, 500)
        },
        showPermission(permissionName) {
            return (
                this.user.permissions_id &&
                permissionName
                    .map((name) => this.user.permissions_id[name])
                    .includes(true)
            )
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
