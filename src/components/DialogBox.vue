<template>
  <md-dialog :md-active.sync="dialog.show">
    <div
      style="
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 2rem;
        top: 1rem;
      "
    >
      <md-button class="md-icon-button" @click="dialog.show = false">
        <md-icon style="color: white">close</md-icon>
      </md-button>
    </div>
    <md-dialog-content>
      <component :is="dialog.show ? dialog.screen : null"></component>
    </md-dialog-content>
  </md-dialog>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AddContacts from "./AddContacts.vue";
import AddCompany from "./AddCompany.vue";
import AddAdmin from "./AddAdmin.vue";

export default {
  components: {
    AddContacts,
    AddCompany,
    AddAdmin
  },
  computed: {
    ...mapGetters(["dialog"]),
  },
};
</script>
