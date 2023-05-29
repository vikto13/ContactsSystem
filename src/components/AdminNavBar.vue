<template>
  <div>
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

  </div>
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
