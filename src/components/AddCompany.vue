<template>
  <div class="m-3 mt-5" style="width: 30rem">
    <h5 class="pb-3">{{ showTitle }}</h5>
    Įmonės pavadinimas

    <input
      v-model="company.name"
      type="text"
      class="form-control"
      :placeholder="'Įveskite įmonės pavadinimą...'"
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
import { pocketBase } from "../../services/pocketBase";
export default {
  components: {
    DivideComponents,
  },
  computed: {
    ...mapGetters(["company"]),
    showTitle() {
      return this.company.id != null
        ? "Redaguoti įmonę: "
        : "Pridėti naują įmonę: ";
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
         ?await this.editCompany()
         :await this.saveCompany()

        await this.fetchCompanies();
        this.dismissDialog();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
