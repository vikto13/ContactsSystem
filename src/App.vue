<template>
  <router-view> <nav-bar></nav-bar> </router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
