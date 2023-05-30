<template>
  <div class="md-layout-item m-3">
    <h5 class="mt-5 text-center" style="width: 32rem; ">
      {{ `${office.id != null ? "Pakeisti ofiso duomenis" : "Pridėti ofisą"}` }}
    </h5>
    <input-box-icon
      :title="`Kompanijos pavadinimas: `"
      :bottom-text="'Pasirinkite kompaniją'"
      :is-not-valid="this.submit && !office.selectedNames.length"
      class="mb-2"
    >
      <md-field>
        <md-select
          v-model="office.selectedNames"
          multiple
          :disabled="typeof office.id == 'string'"
        >
          <md-option
            v-for="option in companyDetails['companies'].all"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }}
          </md-option>
        </md-select>
      </md-field>
    </input-box-icon>

    <input-box-icon
      v-for="(input, index) in inputs"
      :key="index"
      :title="`${input.title}: `"
      class="mb-3"
      :bottom-text="messageById({ [input.id]: office[inputs[index].id] })"
      :is-not-valid="isInvalid({ [input.id]: office[inputs[index].id] })"
    >
      <input
        v-model="office[inputs[index].id]"
        type="text"
        class="form-control table-footer"
        :placeholder="input.placeholder"
        :class="{
          'is-invalid': isInvalid({ [input.id]: office[inputs[index].id] }),
        }"
      />
    </input-box-icon>

    <md-button
      class="btn w-100 m-0 "
      @click="add"
    >
      {{ office.id != null ? "Pakeisti" : "Pridėti" }}
    </md-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import InputBoxIcon from "./InputBoxIcon.vue";
import { LoginMixin } from "../views/mixins/LoginMixin";
export default {
  components: {
    InputBoxIcon,
  },
  mixins: [LoginMixin],
  computed: {
    ...mapGetters(["office", "companyDetails"]),
  },
  data() {
    return {
      inputs: [
        {
          id: "street",
          title: "Gatvė",
          placeholder: "Įveskite gatvę...",
        },
        {
          id: "street_number",
          title: "Gatvės numeris",
          placeholder: "Įveskite gatvės numerį...",
        },
        {
          id: "city",
          title: "Miestas",
          placeholder: "Įveskite miestą...",
        },
        {
          id: "country",
          title: "Šalis",
          placeholder: "Įveskite šalį...",
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "saveOffice",
      "dismissDialog",
      "fetchOffices",
      "editOffice",
    ]),
    async add() {
      if (
        this.inputs
          .map(({ id }) => this.office[id])
          .some((item) => item == null)
      ) {
        this.submit = true;
        return;
      }
      try {
        if (this.office.id) {
          await this.editOffice();
        } else {
          await this.saveOffice();
        }
        await this.fetchOffices();
        this.dismissDialog();
      } catch (error) {
        console.log(error);
      }
    },
  },
  destroyed() {
    this.$store.commit("clearOfficeState");
  },
};
</script>
<style>
.md-list-item-text {
  padding-left: 10%;
  padding-top: 3%;
}
</style>
