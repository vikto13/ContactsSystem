<template>
  <div>
    <dialog-box></dialog-box>
    <router-view>
      <nav-bar> </nav-bar>
    </router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import DialogBox from "./components/DialogBox.vue";

export default {
  components: {
    NavBar,
    DialogBox,
  },
};
</script>
