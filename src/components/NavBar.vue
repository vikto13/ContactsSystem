<template>
  <ul class="nav nav-fill dialog-box navigation-bar">
    <router-link :to="'/contacts/records'">
      <img
        id="logo-icon"
        src="../assets/teltonika_logo.png"
        style="height: 3rem"
      />
    </router-link>

    <template v-if="user.token">
      <li
        v-for="(tab, index) in navBar"
        :key="index"
        class="nav-item d-flex flex-row p-3"
      >
        <router-link
          :to="`${tab.path}`"
          class="nav-link text-white"
          :class="'active'"
          >{{ tab.title }}</router-link
        >
      </li>

      <md-menu md-size="medium" md-align-trigger>
        <md-button
          md-menu-trigger
          class="md-icon-button md-raised"
          style="background-color: white !important"
        >
          <img v-if="user.avatar" :src="user.avatar.result" />
          <md-icon v-else class="cb">person</md-icon>
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
import { mapActions, mapGetters } from "vuex";
import { LoginMixin } from "../views/mixins/LoginMixin";
export default {
  computed: {
    ...mapGetters(["user", "navBar"]),
  },
  mixins: [LoginMixin],
  methods: {
    ...mapActions(["triggerMessage", "resetPassword"]),
    signOut() {
      this.$router.push("/users/auth-with-password");
      this.$store.commit("clearUserData");
      localStorage.removeItem("pocketbase_auth");
    },
  },
};
</script>

<style>
@media only screen and (max-width: 860px) {
  #logo-icon {
    display: none;
  }
}
</style>
