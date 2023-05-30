<template>
  <div class="md-layout-item m-2">
    <h3 class="mb-5 mt-3">
      {{ contact.id ? "Pakeisti kontaktą" : "Pridėti naują kontaktą:" }}
    </h3>
    <div v-for="(table, index) in inputs" :key="index">
      <h5 v-if="table.name" class="mt-5">{{ table.name }}</h5>
      <input-box-icon
        v-for="(column, index) in table.boxs"
        :key="index"
        :icon-name="column.icon"
        :bottom-text="messageById({ [column.input]: contact[column.input] })"
        :title="`${column.title}:`"
        :is-not-valid="isInvalid({ [column.input]: contact[column.input] })"
      >
        <input
          v-model="contact[column.input]"
          type="text"
          class="form-control"
          :placeholder="column.placeholder"
          :class="{
            'is-invalid': isInvalid({
              [column.input]: contact[column.input],
            }),
          }"
          style="background-color: #f1f2f4"
          :style="{ 'border-left-width': column.icon ? 0 : null }"
        />
      </input-box-icon>
    </div>
    <md-button class="btn w-100 m-0 mt-4" @click="save">
      {{ contact.id ? "Pakeisti" : "Pridėti" }}
    </md-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddImage from "./AddImage.vue";
import InputBoxIcon from "./InputBoxIcon.vue";
import { LoginMixin } from "../views/mixins/LoginMixin";
export default {
  components: {
    InputBoxIcon,
    AddImage,
  },
  computed: {
    ...mapGetters(["contact"]),
  },
  mixins: [LoginMixin],
  data() {
    return {
      inputs: [
        {
          name: "",
          boxs: [
            {
              title: "Vardas",
              placeholder: "Įveskite vardą...",
              input: "name",
            },
            {
              title: "Pavardė",
              placeholder: "Įveskite pavardę...",
              input: "surname",
            },
            {
              title: "Pozicija",
              placeholder: "Įveskite poziciją...",
              input: "position",
            },
          ],
        },
        {
          name: "Kontaktinė informacija",
          boxs: [
            {
              title: "Elektroninis paštas",
              placeholder: "Įveskite el.paštą...",
              icon: "mail",
              input: "email",
            },
            {
              title: "Telefono numeris",
              placeholder: "Įveskite telefono numerį...",
              icon: "phone",
              input: "phone_number",
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "saveContact",
      "editContact",
      "dismissDialog",
      "fetchContacts",
    ]),
    async save() {
      this.submit = true;
      if (
        this.inputs
          .map(({ boxs }) =>
            boxs.map(({ input }) =>
              this.isInvalid({
                [input]: this.contact[input],
              })
            )
          )
          .some((subArray) => subArray.includes(true))
      ) {
        return;
      }
      try {
        this.contact.id ? await this.editContact() : await this.saveContact();
        this.dismissDialog();
        this.fetchContacts();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
