<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">Kompanijos</h1>
      <field-to-create :text="'Pridėti naują kompaniją'" @pressed="edit(null)">
      </field-to-create>
      <divide-components
        v-for="company in companyDetails[id].all"
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
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
import DivideComponents from "../components/DivideComponents.vue";
import FieldToCreate from "../components/FieldToCreate.vue";

export default {
  props: {
    id: {
      type: String,
    },
  },
  components: {
    Card,
    DivideComponents,
    FieldToCreate,
  },
  computed: {
    ...mapGetters([ "company", "companyDetails"]),
  },
  async mounted() {
    await this.fetchCompanies(this.id);
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
      id ? await this.findCompany({ id, entity: this.id }) : null;

      this.triggerDialog("add-company");
    },
    async deleteIt(id) {
      await this.findCompany({ id, entity: this.id });

      this.triggerMessage({
        title: `Ar tikrai norite ištrinti ${
          this.companyDetails[this.id].what
        }?`,
        content: `${this.companyDetails[this.id].whose} pavadinimas: ${
          this.company.name
        }`,
        action: async () => {
          await this.deleteCompany();
          this.$store.commit("clearCompanyData");
          await this.fetchCompanies(this.id);
        },
        cancelAction: () => {
          this.$store.commit("clearCompanyData");
        },
      });
    },
  },
};
</script>

<style scoped>
.nav-pills .nav-link.active {
  background-color: #1f3f77;
}
</style>
