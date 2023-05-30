<template>
  <div>
    <li
      v-for="(tab, index) in tabItems"
      :key="index"
      class="nav-item d-flex flex-row p-1"
    >
      <router-link :to="`${tab.path}`" class="nav-link text-white">{{
        tab.title
      }}</router-link>
    </li>
  </div>
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
