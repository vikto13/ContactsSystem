<template>
  <div style="width: 42rem">
    <div :class="true?'md-layout':null"  >
      
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
      @click="saveContact"
    >
      PRIDĖTI
    </md-button>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AddImage from './AddImage.vue';
import CompanyDetailsSelect from './CompanyDetailsSelect.vue';
import ContactFields from './ContactFields.vue';
import InputBoxIcon from "./InputBoxIcon.vue";
export default {
  components: {
    ContactFields,
    CompanyDetailsSelect
  },
  methods: {
    ...mapActions(["saveContact"]),
  },
};
</script>
