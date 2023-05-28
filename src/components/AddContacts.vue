<template>
  <div style="width: 42rem">
    <div :class="true ? 'md-layout' : null">
      <contact-fields v-show="true"></contact-fields>
      <company-details-select></company-details-select>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CompanyDetailsSelect from "./CompanyDetailsSelect.vue";
import ContactFields from "./ContactFields.vue";
export default {
  components: {
    ContactFields,
    CompanyDetailsSelect,
  },
  beforeDestroy() {
    this.$store.commit("clearContact");
  },
  computed: {
    ...mapGetters(["contact"]),
  },
  methods: {
    ...mapActions([
      "saveContact",
      "fetchContacts",
      "dismissDialog",
      "clearContact",
      "editContact",
    ]),
  },
};
</script>
