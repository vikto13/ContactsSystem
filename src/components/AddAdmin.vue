<template>
  <div>
    <div class="md-layout">
      <div v-show="admin.whatDo != 0" class="md-layout-item m-2">
        <h3 class="mb-3 mt-3">{{ title[admin.whatDo] }}:</h3>
        <input-box-icon :title="'Vardas:'">
          <input
            v-model="admin.name"
            type="text"
            class="form-control"
            :placeholder="'Įveskite vardą...'"
            style="background-color: #f1f2f4"
          />
        </input-box-icon>
        <input-box-icon :icon-name="'mail'" :title="'Elektroninis paštas:'">
          <input
            v-model="admin.email"
            type="text"
            class="form-control"
            :placeholder="'Įveskite el.paštą...'"
            style="background-color: #f1f2f4"
            :style="{ 'border-left-width': 0 }"
          />
        </input-box-icon>

        <add-image></add-image>
      </div>

      <div v-show="admin.whatDo != 1" class="md-layout-item m-3 pt-5">
        <h4>Administracinės teisės</h4>
        <md-checkbox
          v-for="item in adminRoles"
          :key="item.id"
          v-model="admin.roles"
          :value="item.id"
          class="md-primary"
          style="display: flex"
          >{{ item.title }}</md-checkbox
        >
      </div>
    </div>
    <md-button
      style="
        background-color: #1f3f77 !important;
        color: white;
        width: 100%;
        margin: 0;
        margin-top: 1rem;
        text-align: start;
        padding-left: 5%;
      "
      @click="save"
    >
      {{ button[admin.whatDo] }}
    </md-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddImage from "./AddImage.vue";
import InputBoxIcon from "./InputBoxIcon.vue";
export default {
  components: {
    InputBoxIcon,
    AddImage,
  },
  computed: {
    ...mapGetters(["adminRoles", "admin", "admins"]),
  },
  async mounted() {
    this.admin.whatDo == null ? this.clearAdminData() : null;
    await this.fetchRoles();
  },
  data() {
    return {
      title: {
        null: "Pridėti naują admin paskyrą",
        0: "Keisti leidimus",
        1: "Redaguoti",
      },
      button: {
        null: "Pridėti",
        0: "Keisti",
        1: "Redaguoti",
      },
    };
  },
  methods: {
    ...mapActions([
      "fetchRoles",
      "saveAdmin",
      "dismissDialog",
      "fetchAdmins",
      "clearAdminData",
      "updateAdmin",
    ]),
    async save() {
      if ((this.admin.whatDo == 1) & !this.admin.name && !this.admin.email) {
        console.log("nooooooooooo");
        return;
      }

      if (this.admin.whatDo != null) {
        await this.updateAdmin();
      } else {
        await this.saveAdmin();
      }

      await this.fetchAdmins();
      this.dismissDialog();
    },
  },
  destroyed() {
    this.clearAdminData();
  },
};
</script>
<style>
.md-checkbox {
  margin: 3% 0 0 0 !important;
}
.md-checked .md-checkbox-container {
  background-color: black;
}
</style>
