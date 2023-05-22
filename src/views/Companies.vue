<template>
  <div>
    <slot></slot>
    <div class="container mt-2">
      <h1>Įmonės</h1>

      <field-to-create :text="'Pridėti naują įmonę'" @pressed="edit(null)">
      </field-to-create>

      <p>Iš viso rasta: {{ companyList.length }} įmonių</p>
      <divide-components
        v-for="company in companyList"
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
              class="md-icon-button md-raised"
              style="background-color: #1f3f77 !important"
              @click="() => edit(company.id)"
            >
              <md-icon style="color: white">edit</md-icon>
            </md-button>

            <md-button
              class="md-icon-button md-raised ml-3"
              style="background-color: #a61a11 !important"
              @click="() => deleteIt(company.id)"
            >
              <md-icon style="color: white">delete</md-icon>
            </md-button>
          </div>
          <h1>{{ user.name }}</h1>
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
  components: {
    Card,
    DivideComponents,
    FieldToCreate,
  },
  computed: {
    ...mapGetters(["user", "companyList", "company"]),
  },
  async created() {
    await this.fetchCompanies();
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "addCompanyName",
      "fetchCompanies",
      "deleteCompany",
      "triggerMessage",
      "putCompany",
    ]),
    edit(id) {
      this.putCompany(id);
      this.triggerDialog("add-company");
    },
    async deleteIt(id) {
      await this.putCompany(id);
      this.triggerMessage({
        title: "Ar tikrai norite ištrinti įmonę?",
        content: `Įmonės pavadinimas: ${this.company.name}`,
        action: async () => {
          await this.deleteCompany();
          await this.fetchCompanies();
        },
        // beforeDestroy: () => {},
      });
    },
  },
};
</script>
