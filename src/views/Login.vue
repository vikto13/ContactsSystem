<template>
    <div class="darkBlue h-100 w-100 position-fixed">
        <div class="md-layout md-gutter md-alignment-center h-100">
            <md-button
                class="md-icon-button md-raised position-absolute back-icon"
                @click="$router.push(goBackPath)"
            >
                <md-icon style="color: #1f3f77">reply</md-icon>
            </md-button>
            <divide-components
                :size-xs="90"
                :size-s="65"
                :size-m="50"
                :size-l="35"
                :size-xl="20"
            >
                <div
                    class="card px-4 pt-5"
                    :style="{ 'padding-bottom': '25%' }"
                >
                    <router-view></router-view>
                </div>
            </divide-components>
        </div>
    </div>
</template>
<script>
import AdminLogin from '../components/AdminLogin.vue'
import RemindPassword from '../components/RemindPassword.vue'
import DivideComponents from '../components/utils/DivideComponents.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        DivideComponents,
        AdminLogin,
        RemindPassword,
    },
    computed: {
        ...mapGetters(['adminPages', 'navBar']),
        goBackPath() {
            return this.$route.path === this.navBar.admins.loginPath
                ? this.navBar.contacts.path
                : this.navBar.admins.loginPath
        },
    },
}
</script>
