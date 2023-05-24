<template>
  <div style="width: 42rem">
    <div :class="true ? 'md-layout' : null">
     <contact-fields v-show="true"></contact-fields>
     <company-details-select></company-details-select>
    </div>
    <md-button
      style="
        background-color: #1f3f77 !important;
        color: white;
        width: 100%;
        margin: 0;
        margin-top: 3rem;
        text-align: start;
        padding-left: 5%;
      "
      @click="save"
    >
      PRIDĖTI
    </md-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CompanyDetailsSelect from "./CompanyDetailsSelect.vue";
import ContactFields from "./ContactFields.vue";
export default {
  components: {
    ContactFields,
    CompanyDetailsSelect
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
    async save() {
      try {
        this.contact.id ? await this.editContact() : await this.saveContact();
        this.dismissDialog();
        this.fetchContacts();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
