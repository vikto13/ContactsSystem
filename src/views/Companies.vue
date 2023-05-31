<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">{{ navBar.companies.whose }}</h1>
      <field-to-create :text="navBar.companies.textAdd" @pressed="edit(null)">
      </field-to-create>
      <h5
        v-if="
          companyDetails[companyDetails.companies.id] != null &&
          companyDetails[companyDetails.companies.id].length
        "
        style="text-align: center"
      >
        {{ navBar.companies.textEmpty }}
      </h5>
      <div v-else>
        <divide-components
          v-for="company in companyDetails[companyDetails.companies.id].all"
          :key="company.id"
          :size-xl="40"
          :size-l="50"
          :size-s="90"
          :size-m="60"
        >
          <md-card
            class="pl-5 mt-3"
            style="
              height: 5rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            ž
            <div style="overflow: hidden; text-overflow: ellipsis; flex: 1">
              {{ company.name }}
            </div>
            <div>
              <md-button
                md-with-hover
                class="md-icon-button md-raised edit-btn"
                @click="() => edit(company.id)"
              >
                <md-icon style="color: white">edit</md-icon>
              </md-button>

              <md-button
                md-with-hover
                class="md-icon-button md-raised ml-3 delete-btn"
                @click="() => deleteIt(company.id)"
              >
                <md-icon style="color: white">delete</md-icon>
              </md-button>
            </div>
          </md-card>
        </divide-components>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
import DivideComponents from "../components/DivideComponents.vue";
import FieldToCreate from "../components/FieldToCreate.vue";
import { LoginMixin } from "./mixins/LoginMixin";

export default {
  components: {
    Card,
    DivideComponents,
    FieldToCreate,
  },
  mixins: [LoginMixin],
  computed: {
    ...mapGetters(["company", "companyDetails", "navBar"]),
  },
  async mounted() {
    this.tryCatchForAPIAction(
   this.fetchCompanies(this.companyDetails.companies.id)
    );
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "fetchCompanies",
      "deleteCompany",
      "triggerMessage",
      "findCompany",
    ]),
    async edit(id) {
      this.tryCatchForAPIAction(async () => {
        id &&
          (await this.findCompany({
            id,
            entity: this.companyDetails.companies.id,
          }));

        this.triggerDialog("add-company");
      });
    },
    async deleteIt(id) {
      this.tryCatchForAPIAction(async () => {
        await this.findCompany({
          id,
          entity: this.companyDetails.companies.id,
        });

        this.triggerMessage({
          title: `Ar tikrai norite ištrinti ${
            this.navBar[this.companyDetails.companies.id].what
          }?`,
          content: `${
            this.navBar[this.companyDetails.companies.id].whose
          } pavadinimas: ${this.company.name}`,
          action: async () => {
            this.tryCatchForAPIAction(async () => {
              await this.deleteCompany();
              this.$store.commit("clearCompanyData");
              await this.fetchCompanies(this.companyDetails.companies.id);
            })
          },
          cancelAction: () => {
            this.$store.commit("clearCompanyData");
          },
        });
      })
    },
  },
};
</script>

<style scoped>
.nav-pills .nav-link.active {
  background-color: #1f3f77;
}
</style>
