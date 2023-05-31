<template>
  <div class="md-layout md-gutter md-alignment-center">
    <divide-components
      v-for="(filter, index) in [
        companyDetails.companies,
        companyDetails.divisions,
        companyDetails.departments,
        companyDetails.groups,
        companyDetails.office,
      ]"
      :key="index"
    >
      <label class="form-label">{{ filter.title }}: </label>
      <select
        :v-model="filter.selected"
        class="form-select elipses"
        aria-label="Default select example"
        @click="({ target }) => pressed(target, filter.id)"
      >
        <option :disabled="'' == filter.selected" selected :value="null">
          {{ filter.title }}
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
    ...mapGetters(["companyDetails", "alert"]),
  },
  async mounted() {
    try {
      await Promise.all(
        [
          this.companyDetails.companies,
          this.companyDetails.departments,
          this.companyDetails.divisions,
          this.companyDetails.groups,
        ].map(({ id }) => this.fetchCompanies(id))
      );
      await this.getOfficesAddress();
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
      "getOfficesAddress",
    ]),
    async pressed(select, id) {
      this.$store.commit("selectCompany", { select: select.value, id });
      try {
        await this.searchContactBySelections();
        await this.searchContactByText();
        this.alert.showAlert && this.disableAlert();
      } catch {
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
