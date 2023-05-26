<template>
  <li
    v-for="(tab, index) in tabItems"
    :key="index"
    class="nav-item d-flex flex-row"
    style="padding: 1%"
  >
    <router-link :to="`${tab.path}`" class="nav-link" style="color: white">{{
      tab.title
    }}</router-link>
  </li>

  <!-- <md-menu md-size="medium" md-align-trigger>
      <md-button
        md-menu-trigger
        class="md-icon-button md-raised"
        style="background-color: white !important"
      >
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
    </md-menu> -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
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
