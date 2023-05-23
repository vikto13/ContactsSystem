<template>
  <md-dialog-confirm
    :md-active.sync="message.active"
    :md-title="message.title"
    :md-content="message.content"
    md-confirm-text="Taip"
    md-cancel-text="Ne"
    @md-cancel="onCancel"
    @md-confirm="onConfirm"
  />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["message", "company", "admin"]),
  },
  methods: {
    async onConfirm() {
      await this.message.action();
    },
    onCancel() {},
  },
};
</script>

<style scoped>
.md-button {
  color: white !important;
}
</style>
