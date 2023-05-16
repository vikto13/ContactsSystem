<template>
  <div class="darkBlue" style="position: fixed; width: 100%; height: 100%">
    <div class="md-layout md-gutter md-alignment-center" style="height: 100%">
      <md-button
        class="md-icon-button md-raised"
        style="
          background-color: white !important;
          position: absolute;
          top: 5%;
          left: 5%;
        "
      >
        <md-icon style="color: #1f3f77">reply</md-icon>
      </md-button>

      <divide-components
        :size-xs="90"
        :size-s="65"
        :size-m="50"
        :size-l="35"
        :size-xl="20"
      >
        <div class="card px-4" style="padding-top: 5%" :style="addingBottom">
          <h1>{{ titleText[Number(remind)] }}</h1>
          <div class="forms-inputs mb-4">
            <span>Elektroninis paštas: </span>
            <input-box-icon :icon-name="'mail'">
              <input
                type="text"
                class="form-control"
                placeholder="Įveskite el pašto adresą..."
                style="padding-left: 2.5rem; background-color: #f1f2f4"
              />
            </input-box-icon>
            <div class="invalid-feedback">A valid email is required!</div>
          </div>
          <div v-show="!remind" class="forms-inputs mb-4">
            <span>Slaptažodis:</span>
            <input-box-icon :icon-name="'lock'">
              <input
                type="text"
                class="form-control"
                placeholder="Įveskite slaptažodį..."
                style="padding-left: 2.5rem; background-color: #f1f2f4"
              />
            </input-box-icon>
            <div class="invalid-feedback">Password must be 8 character!</div>
          </div>
          <span v-show="!remind"
            >Pamiršote slaptažodį? Pakeisti slaptažodį</span
          >
          <div class="mb-3" style="padding-top: 2rem">
            <button class="btn w-100">{{ buttonText[Number(remind)] }}</button>
          </div>
        </div>
      </divide-components>
    </div>
  </div>
</template>
<script>
import Card from "../components/Card.vue";
import DivideComponents from "../components/DivideComponents.vue";
import InputBoxIcon from "../components/InputBoxIcon.vue";
export default {
  components: {
    DivideComponents,
    Card,
    InputBoxIcon,
  },
  data() {
    return {
      email: "",
      remind: true,
      titleText: {
        0: "Admin prisijungimas",
        1: "Priminti slaptažodį",
      },
      buttonText: {
        0: "Prisijungti",
        1: "Pateikti",
      },
    };
  },
  computed: {
    addingBottom() {
      return `padding-bottom ${this.remind ? "50%" : "25%"}`;
    },
  },
};
</script>
<style>
.btn {
  background-color: #1f3f77;
  color: white;
}
.btn:hover {
  background-color: #1f3f77;
  color: white;
}
</style>
