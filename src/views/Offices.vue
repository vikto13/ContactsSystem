<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">Ofisai</h1>
      <field-to-create
        :text="'Pridėti naują ofisą'"
        @pressed="triggerDialog('add-office')"
      >
      </field-to-create>

      <md-table
        v-model="offices"
        md-sort="name"
        md-sort-order="asc"
        md-card
        md-fixed-header
        class="mt-5"
        style="background-color: #f1f2f4"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Pavadinimas" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Gatvė" md-sort-by="street">{{
            ` ${item.street} ${item.street_number}`
          }}</md-table-cell>
          <md-table-cell md-label="Miestas" md-sort-by="city">{{
            item.city
          }}</md-table-cell>
          <md-table-cell md-label="Šalia" md-sort-by="country">{{
            item.country
          }}</md-table-cell>

          <md-table-cell md-label="Veiksmas">
            <md-button
              class="md-dense md-raised md-primary"
              style="
                background-color: #0054a6 !important;
                border-radius: 5rem;
                width: 15rem;
              "
              @click="() => edit(item.id)"
              >Redaguoti</md-button
            >
            <md-button
              class="md-dense md-raised md-primary"
              style="background-color: #a61a11 !important; border-radius: 5rem"
              @click="() => deleting(item.id)"
              >Ištrinti</md-button
            >
          </md-table-cell>
        </md-table-row>
      </md-table>
      <!-- <h5 v-else style="text-align: center">Nėra sukurtų admino paskyrų</h5> -->
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
    this.fetchOffices();
  },
  computed: {
    ...mapGetters(["admins", "office"]),
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
      "setAdmin",
      "setWhatDo",
      "triggerMessage",
      "deleteAdmin",
      "clearAdminData",
      "findOffice",
      "deleteOffice",
    ]),
    async edit(id) {
      await this.findOffice(id);

      this.triggerDialog("add-office");
    },
    async deleting(id) {
      await this.findOffice(id);

      this.triggerMessage({
        title: "Ar tikrai norite ištrinti ofiso duomenis?",
        content: `Ofiso pavadinimas: ${this.office.name}`,
        action: async () => {
          await this.deleteOffice();
          await this.fetchOffices();
        },
      });
    },
  },
};
</script>
<style scoped></style>
