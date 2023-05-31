<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">{{ navBar.relationship.title }}</h1>
      <field-to-create
        :text="'Pridėti naują struktūrą'"
        @pressed="triggerDialog('add-relationship')"
      >
      </field-to-create>
      <md-table
        v-if="showCompanies.length"
        v-model="showCompanies"
        md-sort="name"
        md-sort-order="asc"
        md-card
        md-fixed-header
        class="mt-5 table-footer"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Pavadinimas" md-sort-by="name">{{
            ` ${item.name} `
          }}</md-table-cell>
          <md-table-cell md-label="Tipas">{{
            navBar[item.collectionName].title
          }}</md-table-cell>

          <md-table-cell md-label="Veiksmas">
            <md-button
              class="md-dense md-raised md-primary edit-btn table-btn"
              @click.stop="edit({ entity: item.collectionName, id: item.id })"
              >Redaguoti</md-button
            >
            <md-button
              class="md-dense md-raised md-primary delete-btn table-btn"
              @click.stop="
                () => deleting({ entity: item.collectionName, id: item.id })
              "
              >Ištrinti</md-button
            >
          </md-table-cell>
        </md-table-row>
      </md-table>
      <h5 v-else class="text-center">{{ navBar.relationship.textEmpty }}</h5>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FieldToCreate from "../components/FieldToCreate.vue";
export default {
  components: {
    FieldToCreate,
  },
  async mounted() {
    await this.fetchAllCompanies();
    console.log(this.showCompaniesRealations);
  },
  data() {
    return {
      show: [],
    };
  },
  computed: {
    ...mapGetters([
      "admins",
      "companyDetails",
      "company",
      "showCompaniesRealations",
      "navBar"
    ]),
    showCompanies: {
      get() {
        return this.showCompaniesRealations;
      },
      set() {},
    },
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "triggerMessage",
      "fetchAllCompanies",
      "findCompany",
      "deleteCompany",
    ]),
    getData() {
      let fetch = [
        this.companyDetails.departments,
        this.companyDetails.groups,
        this.companyDetails.divisions,
      ].map(({ all }) => all);
      this.show = [].concat(...fetch);
    },

    async edit(find) {
      await this.findCompany(find);

      this.triggerDialog("add-relationship");
    },
    async deleting(find) {
      await this.findCompany(find);

      this.triggerMessage({
        title: "Ar tikrai norite ištrinti ryšį?",
        content: `Rišys yra: ${
          this.navBar[this.company.collectionName].title
        } su ${this.company.name}`,

        action: async () => {
          await this.deleteCompany();
          this.$store.commit("clearCompanyData");
          await this.fetchAllCompanies();
          this.getData();
        },

        cancelAction: () => {
          this.$store.commit("clearCompanyData");
        },
      });
    },
  },
};
</script>
