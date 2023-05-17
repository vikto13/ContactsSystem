<template>
  <div>
    <h1 class="mb-4">Pakeisti slaptažodį</h1>
    <div class="forms-inputs mb-4">
      <span> Nujas slaptažodis: </span>
      <input-box-icon :icon-name="'lock'">
        <input
          v-model="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': isInvalid(password) }"
          placeholder="Įveskite naują slaptažodį..."
          style="padding-left: 2.5rem; background-color: #f1f2f4"
        />
      </input-box-icon>
      <span v-show="showPasswordMessage" style="color: red">
        {{ passwordMessage }}
      </span>
    </div>
    <div class="forms-inputs mb-4">
      <span>Pakartoti naują slaptažodį: </span>
      <input-box-icon :icon-name="'lock'">
        <input
          v-model="secPassword"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': isInvalid(secPassword) }"
          placeholder="Pakartoti naują slaptažodį..."
          style="padding-left: 2.5rem; background-color: #f1f2f4"
        />
      </input-box-icon>
      <span v-show="comparePasswords" style="color: red">
        {{ comparePasswords }}
      </span>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="() => change()">Keisti</button>
    </div>
  </div>
</template>
<script>
import { LoginMixin } from "../views/mixins/LoginMixin";
export default {
  mixins: [LoginMixin],
  methods: {
    change() {
      if (!this.passwordMessage && !this.comparePasswords) {
        console.log("changeeeeeeeee");
      }
      this.submit = true;
    },
  },
};
</script>
