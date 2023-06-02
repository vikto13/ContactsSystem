<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">{{ navBar.offices.title }}</h1>
      <field-to-create
        :text="navBar.offices.textAdd"
        @pressed="triggerDialog('add-office')"
      >
      </field-to-create>
      <md-table
        v-if="offices != null && offices.length"
        v-model="offices"
        md-sort="name"
        md-sort-order="asc"
        md-card
        md-fixed-header
        class="mt-5"
        style="background-color: #f1f2f4"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Pavadinimas" md-sort-by="name">
            {{ item.name }}
          </md-table-cell>
          <md-table-cell md-label="Gatvė" md-sort-by="street">{{
            ` ${item.street} ${item.street_number}`
          }}</md-table-cell>
          <md-table-cell md-label="Miestas" md-sort-by="city">{{
            item.city
          }}</md-table-cell>
          <md-table-cell md-label="Šalis" md-sort-by="country">{{
            item.country
          }}</md-table-cell>

          <md-table-cell md-label="Veiksmas">
            <md-button
              class="md-dense md-raised md-primary edit-btn table-btn"
              @click="() => edit(item.id)"
              >Redaguoti</md-button
            >
            <md-button
              class="md-dense md-raised md-primary delete-btn table-btn"
              @click="() => deleting(item.id)"
              >Ištrinti</md-button
            >
          </md-table-cell>
        </md-table-row>
      </md-table>
      <h5 v-else-if="offices != null" style="text-align: center">
        {{ navBar.offices.textEmpty }}
      </h5>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FieldToCreate from "../components/FieldToCreate.vue";
import { LoginMixin } from "./mixins/LoginMixin";
export default {
  components: {
    FieldToCreate,
  },
  mixins: [LoginMixin],
  async mounted() {
    this.tryCatchForAPIAction(async () => {
      this.fetchOffices();
      this.fetchAllCompanies();
    });
  },
  computed: {
    ...mapGetters(["office", "navBar"]),
    offices: {
      get() {
        return this.$store.getters.offices;
      },
      set() {},
    },
  },

  methods: {
    ...mapActions([
      "triggerDialog",
      "fetchOffices",
      "triggerMessage",
      "findOffice",
      "deleteOffice",
      "fetchAllCompanies",
    ]),
    async edit(id) {
      this.tryCatchForAPIAction(async () => {
        await this.findOffice(id);
        this.triggerDialog("add-office");
      });
    },
    async deleting(id) {
      this.tryCatchForAPIAction(async () => {
        await this.findOffice(id);

        this.triggerMessage({
          title: "Ar tikrai norite ištrinti ofiso duomenis?",
          content: `Ofisas yra: ${this.office.country}, ${this.office.city}, ${this.office.street} ${this.office.street_number}`,
          action: async () => {
            this.tryCatchForAPIAction(async () => {
              await this.deleteOffice();
              this.$store.commit("clearOfficeState");
              await this.fetchOffices();
            });
          },
          cancelAction: () => {
            this.$store.commit("clearOfficeState");
          },
        });
      });
    },
  },
};
</script>
