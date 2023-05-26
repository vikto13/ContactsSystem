<template>
  <div class="md-layout-item m-3">
    <h5 class="mt-5" style="width: 32rem; text-align: center">
      {{ `${office.id != null ? "Pakeisti ofiso duomenis" : "Pridėti ofisą"}` }}
    </h5>
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
        class="form-control"
        :placeholder="input.placeholder"
        style="background-color: #f1f2f4"
        :class="{
          'is-invalid': isInvalid({ [input.id]: office[inputs[index].id] }),
        }"
      />
    </input-box-icon>

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
    ...mapGetters(["office"]),
  },

  data() {
    return {
      inputs: [
        {
          id: "name",
          title: "Pavadinimas",
          placeholder: "Įveskite pavadinimą...",
        },
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
      "findOffice",
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
