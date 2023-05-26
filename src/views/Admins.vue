<template>
  <div>
    <slot></slot>
    <div class="m-5">
      <h1 style="font-weight: normal">Sukurti admin paskyrą</h1>
      <field-to-create
        :text="'Sukurti naują admin paskyrą'"
        @pressed="triggerDialog('add-admin')"
      >
      </field-to-create>

      <md-table
        v-if="admins.length"
        v-model="admins"
        md-sort="name"
        md-sort-order="asc"
        md-card
        md-fixed-header
        class="mt-5"
        style="background-color: #f1f2f4"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="email">{{
            item.email
          }}</md-table-cell>

          <md-table-cell md-label="Veiksmas">
            <md-button
              class="md-dense md-raised md-primary"
              style="
                background-color: #0054a6 !important;
                border-radius: 5rem;
                width: 15rem;
                margin-left: 0;
              "
              @click="() => change(item.id, 0)"
              >Keisti leidimus</md-button
            >
            <md-button
              class="md-dense md-raised md-primary"
              style="
                background-color: #0054a6 !important;
                border-radius: 5rem;
                width: 15rem;
              "
              @click="() => change(item.id, 1)"
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
      <h5 v-else style="text-align: center">Nėra sukurtų admino paskyrų</h5>
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
    await this.fetchAdmins();
  },
  computed: {
    ...mapGetters(["admin"]),
    admins: {
      get() {
        return this.$store.getters.admins;
      },
      set() {},
    },
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "fetchAdmins",
      "setAdmin",
      "setWhatDo",
      "triggerMessage",
      "deleteAdmin",
      "clearAdminData",
    ]),
    async deleting(id) {
      await this.setAdmin(id);
      this.triggerMessage({
        title: "Ar tikrai norite ištrinti adminą?",
        content: `Admino vardas: ${this.admin.name}`,
        action: async () => {
          await this.deleteAdmin();
          await this.fetchAdmins();
        },
        cancelAction: () => {
          this.clearAdminData();
        },
      });
    },
    async change(id, action) {
      await this.setAdmin(id);
      this.setWhatDo(action);
      this.triggerDialog("add-admin");
    },
  },
};
</script>
<style scoped></style>
