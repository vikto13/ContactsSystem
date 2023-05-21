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
    ...mapGetters(["message","company"]),
  },
  methods: {
    ...mapActions(['deleteCompany','fetchCompanies']),
   async onConfirm() {
      if (this.company.id) {
           await this.deleteCompany()
     await this.fetchCompanies();
      }

    },
    onCancel() {
 
    
    },
  },
};
</script>

<style scoped>
.md-button {
    color: white !important;
}
</style>
