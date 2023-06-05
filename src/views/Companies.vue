<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">{{ navBar.companies.whose }}</h1>
      <field-to-create
        v-show="havePermission('edit_companies')"
        :text="navBar.companies.textAdd"
        @pressed="edit(null)"
      >
      </field-to-create>
      <h5
        v-if="!companyDetails['companies'].all.length"
        style="text-align: center"
      >
        {{ navBar.companies.textEmpty }}
      </h5>
      <div v-else>
        <divide-components
          v-for="company in companyDetails['companies'].all"
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
            <div style="overflow: hidden; text-overflow: ellipsis; flex: 1">
              {{ company.name }}
            </div>
            <div>
              <md-button
                v-show="havePermission('edit_companies')"
                md-with-hover
                class="md-icon-button md-raised edit-btn"
                @click="() => edit(company.id)"
              >
                <md-icon style="color: white">edit</md-icon>
              </md-button>

              <md-button
                v-show="havePermission('delete_companies')"
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
    this.tryCatchForAPIAction(() => {
      this.fetchCompanies("companies");
    });
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "fetchCompanies",
      "deleteCompany",
      "triggerMessage",
      "findCompany",
      "checkIfIsRelation",
    ]),
    async edit(id) {
      this.tryCatchForAPIAction(async () => {
        id &&
          (await this.findCompany({
            id,
            entity: "companies",
          }));

        this.triggerDialog("add-company");
      });
    },
    async deleteIt(id) {
      await this.findCompany({ id, entity: "companies" });
      await this.checkIfIsRelation({ id, collectionName: "companies" });

      if (this.company.relation.length) {
        await this.triggerMessage({
          title: `Negalite ištrinti`,
          content:
            `${this.navBar["companies"].what} turi ryšius: <br>` +
            this.company.relation.join("<br>"),
          isAlert: true,
        });
        this.$store.commit("clearCompanyData");
      } else {
        this.triggerMessage({
          title: `Ar tikrai norite ištrinti ${this.navBar["companies"].what}?`,
          content: `${this.navBar["companies"].whose} pavadinimas: ${this.company.name}`,
          action: async () => {
            await this.deleteCompany();
            this.$store.commit("clearCompanyData");
            await this.fetchCompanies("companies");
          },
          cancelAction: () => {},
        });
      }
    },
  },
};
</script>

<style scoped>
.nav-pills .nav-link.active {
  background-color: #1f3f77;
}
</style>
