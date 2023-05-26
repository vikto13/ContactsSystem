<template>
  <div>
    <slot></slot>
    <div class="card text-bg-light m-5">
      <div class="card-header" style="margin-bottom: 2%">
        <ul class="nav nav-pills card-header-pills mb-4">
          <li
            v-for="(component, index) in [
              companyDetails.companies,
              companyDetails.groups,
              companyDetails.departments,
              companyDetails.divisions,
            ]"
            :key="index"
            class="nav-item"
          >
            <a
              class="nav-link navbar-light"
              :href="component.path"
              :class="component.id == id ? 'active disabled' : ''"
              :style="{
                color: component.id != id ? '#414042' : null,
                textDecoration: 'none',
              }"
              >{{ component.whose }}</a
            >
          </li>
        </ul>
        <field-to-create
          :text="companyDetails[id].addText"
          @pressed="edit(null)"
        >
        </field-to-create>

        <p v-if="companyDetails[id].all.length">
          {{
            `Iš viso rasta: ${companyDetails[id].all.length} ${companyDetails[id].whose}`
          }}
        </p>
        <h1 v-else style="text-align: center">
          {{ companyDetails[id].emptyText }}
        </h1>
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
    ...mapGetters(["user", "companyList", "company", "companyDetails"]),
  },
  async mounted() {
    await this.fetchCompanies(this.id);
  },
  watch: {
    async id() {
      await this.fetchCompanies(this.id);
    },
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "addCompanyName",
      "fetchCompanies",
      "deleteCompany",
      "triggerMessage",
      "findCompany",
    ]),
    async edit(id) {
      id
        ? await this.findCompany({ id, entity: this.id })
        : this.$store.commit("setId", { id: null, name: "" });

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
          await this.deleteCompany(this.id);
          await this.fetchCompanies(this.id);
        },
        cancelAction: () => {},
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
