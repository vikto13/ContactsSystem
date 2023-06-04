<template>
  <div class="md-layout md-gutter md-alignment-center mt-4">
    <divide-components
      v-for="(filter, index) in [
        companyDetails.companies,
        companyDetails.divisions,
        companyDetails.departments,
        companyDetails.groups,
        companyDetails.offices
      ]"
      :key="index"
    >
      <label class="form-label">{{  navBar[filter.name].title}}: </label>
      <select
        :v-model="filter.selected"
        class="form-select elipses"
        aria-label="Default select example"
        @click="({ target }) =>companyDetails[filter.name].selected!=target.value && pressed(target, filter.name)"
      >
        <option :disabled="'' == filter.selected" 
        selected 
        :value="null">
          {{ navBar[filter.name].title }}
        </option>

        <option
          v-for="(select, position) in filter.all"
          :disabled="select.id == filter.selected"
          :key="position"
          :value="select.id"
        >
          {{ select.name }}
        </option>
      </select>
    </divide-components>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DivideComponents from "./DivideComponents.vue";
export default {
  components: {
    DivideComponents,
  },
  computed: {
    ...mapGetters(["companyDetails", "alert","navBar"]),
  },
  async mounted() {
    try {
     
      await Promise.all(
        [
          this.companyDetails.companies,
          this.companyDetails.departments,
          this.companyDetails.divisions,
          this.companyDetails.groups,
          this.companyDetails.offices,
        ].map(({ name }) => this.fetchCompanies(name))
      );
    } catch (err) {
      console.log(err);
      this.showAlert(404);
    }
  
  },
  methods: {
    ...mapActions([
      "fetchCompanies",
      "selectCompany",
      "showAlert",
      "searchContactBySelections",
      "searchContactByText",
      "disableAlert",
   
    ]),
    async pressed(select, id) {

      this.$store.commit("selectCompany", { select: select.value, id });
      try {
        await this.searchContactBySelections();
        await this.searchContactByText();
        this.alert.showAlert && this.disableAlert();
      } catch (err) {
        console.log(err)
        this.showAlert(404);
      }
    },
  },
};
</script>

<style>
.elipses {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
