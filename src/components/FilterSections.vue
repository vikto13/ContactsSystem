<template>
  <div class="md-layout md-gutter md-alignment-center">
    <divide-components
      v-for="(filter, index) in [
        companyDetails.companies,
        companyDetails.divisions,
        companyDetails.departments,
        companyDetails.groups,
      ]"
      :key="index"
    >
      <label class="form-label">{{ filter.title }}: </label>
      <select class="form-select elipses" aria-label="Default select example">
        <option selected disabled>{{ filter.title }}</option>
        <option
          v-for="(select, position) in filter.all"
          :key="position"
          value="1"
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
    ...mapGetters(["companyDetails"]),
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
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      searchBox: [
        {
          title: "Įmonė",
          selectionTitle:
            "Testingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
          options: [
            "Sometdccdsssssssssdfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshing",
            "icdsssssdn",
          ],
        },
        {
          title: "Divizija",
          selectionTitle: "Filtruoti divizijas",
          options: ["Somethidcssssssng", "iddcsssssssssssn"],
        },
        {
          title: "Departamentas",
          selectionTitle: "Filtruoti departamentus",
          options: ["Somethdcsssssing", "idcsdn"],
        },
        {
          title: "Grupė",
          selectionTitle: "Filtruoti grupes",
          options: ["Something", "idn"],
        },
        {
          title: "Adresus",
          selectionTitle: "Filtruoti adresus",
          options: ["Something", "idn"],
        },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchCompanies"]),
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
