<template>
  <div class="m-3 mt-5" style="width: 30rem">
    <input-box-icon
      :title="`${navBar['companies'].whose} pavadinimas:`"
      :bottom-text="'Įveskite pavadinimą'"
      :is-not-valid="isInvalid(employee.name)"
    >
      <input
        v-model="employee.name"
        type="text"
        class="form-control table-footer"
        :class="{ 'is-invalid': isInvalid(employee.name) }"
        :placeholder="`Įveskite ${navBar['companies'].whose} pavadinimą...`"
      />
    </input-box-icon>

    <md-button class="w-50 btn" @click="save()">
      {{ buttonTitle }}
    </md-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DivideComponents from "./DivideComponents.vue";
import { LoginMixin } from "../views/mixins/LoginMixin";
import InputBoxIcon from "./InputBoxIcon.vue";

export default {
  components: {
    DivideComponents,
    InputBoxIcon,
  },
  mixins: [LoginMixin],
  computed: {
    ...mapGetters(["employee", "companyDetails", "navBar"]),
    showTitle() {
      return this.employee.id != null
        ? `Redaguoti ${this.companyDetails["companies"].what}: `
        : `Pridėti naują ${this.companyDetails["companies"].what}:`;
    },
    buttonTitle() {
      return this.employee.id != null ? "Redaguoti" : "Pridėti";
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
      if (!this.employee.name) {
        this.submit = true;
        return;
      }
      this.tryCatchForAPIAction(async () => {
        this.employee.id
          ? await this.editCompany("companies")
          : await this.saveCompany("companies");
        await this.fetchCompanies("companies");
        this.dismissDialog();
      });
    },
  },
  destroyed() {
    this.$store.commit("clearCompanyData");
  },
};
</script>
