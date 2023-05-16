<template>
  <router-view> </router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PocketBase from "pocketbase";
export default {
  component: {
    NavBar,
  },
  async created() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const authData = await pb
      .collection("users")
      .authWithPassword("admin@gmail.com", "admin123");

    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
  },
};
</script>
