<template>
  <div class="darkBlue" style="position: fixed; width: 100%; height: 100%">
    <div class="md-layout md-gutter md-alignment-center" style="height: 100%">
      <md-button
        class="md-icon-button md-raised"
        @click="$router.push(goBackPath)"
        style="
          background-color: white !important;
          position: absolute;
          top: 5%;
          left: 5%;
        "
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
          class="card px-4"
          style="padding-top: 5%"
          :style="{ 'padding-bottom': addingBottom }"
        >
          <router-view></router-view>
        </div>
      </divide-components>
    </div>
  </div>
</template>
<script>
import AdminLogin from "../components/AdminLogin.vue";
import RemindPassword from "../components/RemindPassword.vue";
import UpdatePassword from "../components/UpdatePassword.vue";
import DivideComponents from "../components/DivideComponents.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    DivideComponents,
    AdminLogin,
    RemindPassword,
    UpdatePassword,
  },
  computed: {
    ...mapGetters(["adminPages"]),
    addingBottom() {
      return this.$route.path.split("/")[2] == this.adminPages.authLogin
        ? "25%"
        : "5%";
    },
    goBackPath() {
      return this.$route.path.split("/")[2] == this.adminPages.authRefresh
        ? `/users/${this.adminPages.authLogin}`
        : "/contacts/records";
    },
  },
};
</script>
<style>
.btn {
  background-color: #1f3f77;
  color: white;
}
.btn:hover {
  background-color: #1f3f77;
  color: white;
}
</style>
