<template>
  <div>
    <dialog-box></dialog-box>
    <message></message>
    <router-view>
      <nav-bar> </nav-bar>
      <loader></loader>
      <alert-message class="m-4"></alert-message>
    </router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import DialogBox from "./components/DialogBox.vue";
import Message from "./components/Message.vue";
import AlertMessage from "./components/AlertMessage.vue";
import Loader from "./components/Loader.vue";

export default {
  components: {
    NavBar,
    DialogBox,
    Message,
    AlertMessage,
    Loader,
  },
};
</script>
