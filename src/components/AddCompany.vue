<template>
  <div class="m-3 mt-5" style="width: 30rem">
    <h5 class="pb-3">{{ showTitle }}</h5>
    {{ companyDetails[routeId].whose }} pavadinimas:
    <input
      v-model="company.name"
      type="text"
      class="form-control"
      :placeholder="`Įveskite ${companyDetails[routeId].whose} pavadinimą...`"
      style="background-color: #f1f2f4; width: 20rem"
    />

    <md-button
      style="
        background-color: #1f3f77 !important;
        color: white;
        width: 50%;
        margin: 0;
        margin-top: 1rem;
        text-align: start;
        padding-left: 5%;
      "
      @click="save()"
    >
      {{ buttonTitle }}
    </md-button>
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
    ...mapGetters(["company", "companyDetails"]),
    routeId: {
      get() {
        return this.$route.params.id;
      },
    },
    showTitle() {
      return this.company.id != null
        ? `Redaguoti ${this.companyDetails[this.routeId].what}: `
        : `Pridėti naują ${this.companyDetails[this.routeId].what}:`;
    },
    buttonTitle() {
      return this.company.id != null ? "Redaguoti" : "Pridėti";
    },
  },
  methods: {
    ...mapActions([
      "saveCompany",
      "fetchCompanies",
      "dismissDialog",
      "editCompany",
    ]),
    async save() {
      try {
        this.company.id
          ? await this.editCompany(this.routeId)
          : await this.saveCompany(this.routeId);
        await this.fetchCompanies(this.routeId);
        this.dismissDialog();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
