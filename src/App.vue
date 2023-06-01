<template>
  <div>
    <dialog-box></dialog-box>
    <message></message>
    <router-view>
      <nav-bar> </nav-bar>
    </router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import DialogBox from "./components/DialogBox.vue";
import Message from "./components/Message.vue";

export default {
  components: {
    NavBar,
    DialogBox,
    Message,
  },
};
</script>
