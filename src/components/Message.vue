<template>
  <!-- <md-dialog-confirm
    :md-active.sync="message.active"
    md-title="Ar tikrai norite ištrinti įmonę?"
    md-content="Įmonės pavadinimas: įmonės_pavadinimas"
    md-confirm-text="Taip"
    md-cancel-text="Ne"
    @md-cancel="onCancel"
    @md-confirm="onConfirm"
  /> -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["message"]),
  },
  methods: {
    onConfirm() {
      this.message.value = 1;
    },
    onCancel() {
      this.message.value = 0;
    },
  },
};
</script>
