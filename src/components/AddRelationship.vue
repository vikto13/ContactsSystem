<template>
  <div class="md-layout-item m-3">
    <h5 class="mt-5 text-center">Pridėti struktūrą</h5>

    <input-box-icon
      :title="`Tipas:`"
      :bottom-text="'Pasirinkite tipą'"
      :is-not-valid="submit && !company.collectionName"
      class="mb-2"
    >
      <select
        v-model="company.collectionName"
        class="form-select"
        style="width: 30rem"
      >
        <option :value="''" disabled>Pasirinkite tipą</option>
        <option
          v-for="(component, index) in [
            companyDetails.groups,
            companyDetails.departments,
            companyDetails.divisions,
            companyDetails.offices,
          ]"
          :key="index"
          :value="component.name"
        >
          {{ navBar[component.name].title }}
        </option>
      </select>
    </input-box-icon>
    <!-- {{ companyDetails[company.collectionName].types }} -->
    <input-box-icon
      v-if="company.collectionName"
      :title="`Pasirinkite pavadinimą:`"
      :bottom-text="`Pavadinimas:`"
      :is-not-valid="submit && !company.collectionName"
      class="mb-2"
    >
      <select v-model="company.name" class="form-select" style="width: 30rem">
        <option :value="''" disabled>
          Pasirinkite {{ navBar[company.collectionName].what }}
        </option>
        <option
          v-for="component in companyDetails[company.collectionName].types"
          :key="component.id"
          :value="component.id"
        >
          {{ component.name }}
        </option>
      </select>
    </input-box-icon>

    <input-box-icon
      v-if="company.collectionName"
      :title="`Tipas:`"
      :bottom-text="`Pasirinkite ${navBar[company.collectionName].what}`"
      :is-not-valid="submit && !company.relation"
      class="mb-2"
    >
      <select
        v-model="company.relation"
        class="form-select"
        style="width: 30rem"
      >
        <option :value="''" disabled>
          Pasirinkite
          {{ navBar[companyDetails[company.collectionName].relationship].what }}
        </option>
        <option
          v-for="(component, index) in companyDetails[
            companyDetails[company.collectionName].relationship
          ].types"
          :key="index"
          :value="component.id"
        >
          {{ component.name }}
        </option>
      </select>
    </input-box-icon>

    <md-button
      :disabled="!company.collectionName"
      class="btn w-100"
      :style="{ opacity: company.collectionName ? 1 : 0.4 }"
      @click="add"
    >
      {{ company.id != null ? "Pakeisti" : "Pridėti" }}
    </md-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { LoginMixin } from "../views/mixins/LoginMixin";
import InputBoxIcon from "./InputBoxIcon.vue";
export default {
  components: {
    InputBoxIcon,
  },
  mixins: [LoginMixin],
  async mounted() {
    await this.fetchAllCompanies();
    console.log(this.companyDetails);
  },
  computed: {
    ...mapGetters(["companyDetails", "company", "navBar"]),
  },
  methods: {
    ...mapActions([
      "saveCompany",
      "dismissDialog",
      "fetchCompanies",
      "editCompany",
      "saveCompanyRelation",
      "fetchAllCompanies",
    ]),
    async add() {
      if (
        !(
          this.company.collectionName &&
          this.company.name &&
          this.company.relation
        )
      ) {
        this.submit = true;
        return;
      }
      this.tryCatchForAPIAction(async () => {
        this.company.id
          ? await this.editCompany(this.company.collectionName)
          : await this.saveCompanyRelation();
        this.dismissDialog();
        await this.fetchCompanies(this.company.collectionName);
      });
    },
  },
  destroyed() {
    this.$store.commit("clearCompanyData");
  },
};
</script>
