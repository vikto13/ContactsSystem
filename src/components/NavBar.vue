<template>
  <ul class="nav nav-fill dialog-box" style="
 padding: 0 2% 0 1%;
  top: 0;
 left: 0;
  position: relative;
    background-color: #1F3F77;
    align-items: center;
    ">
    <router-link :to="'/users/records'">
      <img
        id="logo-icon"
        src="../assets/teltonika_logo.png"
        style="height: 3rem"
      />
    </router-link>

    <li
      v-for="(tab, index) in tabItems"
      :key="index"
      class="nav-item d-flex flex-row"
      style="padding: 1%"
    >
      <router-link
        :to="`${tab.path}`"
        class="nav-link"
        :class="'active'"
        style="color: white"
        >{{ tab.title }}</router-link
      >
    </li>
    <md-menu md-size="medium" md-align-trigger>
      <md-button md-menu-trigger class="md-icon-button md-raised" style="background-color: white !important;">
        <md-icon class="cb">person</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item @click="$router.push('/users/update-password')"
          >Pakeisti slaptažodį
          <md-icon style="color: #414042"
            >arrow_drop_down</md-icon
          ></md-menu-item
        >
        <md-menu-item @click="$router.push('/users/auth-with-password')"
          >Atsijungti</md-menu-item
        >
      </md-menu-content>
    </md-menu>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      tabItems: [
        { title: "Kontaktai", path: "/users/records" },
        { title: "Įmonės", path: "/companies/records" },
        { title: "Struktūra", path: "/relationship/record" },
        { title: "Būstinės", path: "/offices/records" },
        { title: "Paskyros", path: "/admins/records" },
      ],
    };
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
