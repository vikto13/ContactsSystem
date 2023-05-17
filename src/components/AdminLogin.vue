<template>
  <div>
    <h1>Admin prisijungimas</h1>
    <div class="forms-inputs mb-4">
      <span>Elektroninis paštas: </span>
      <input-box-icon :icon-name="'mail'">
        <input
          v-model="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': isInvalid(email) }"
          placeholder="Įveskite el pašto adresą..."
          style="padding-left: 2.5rem; background-color: #f1f2f4"
        />
      </input-box-icon>
      <span v-show="showEmailMessage" style="color: red">
        {{ emailMessage }}
      </span>
    </div>
    <div class="forms-inputs mb-4">
      <span>Slaptažodis:</span>
      <input-box-icon :icon-name="'lock'">
        <input
          v-model="password"
          type="password"
          :class="{ 'is-invalid': isInvalid(password) }"
          class="form-control"
          placeholder="Įveskite slaptažodį..."
          style="padding-left: 2.5rem; background-color: #f1f2f4"
        />
      </input-box-icon>
      <span v-show="showPasswordMessage" style="color: red">
        {{ passwordMessage }}
      </span>
    </div>
    <div style="padding-bottom: 1rem">
      Pamiršote slaptažodį?
      <a href="#/users/forgot-password"> Pakeisti slaptažodį </a>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="() => login()">Prisijungti</button>
    </div>
  </div>
</template>
<script>

import { LoginMixin } from "../views/mixins/LoginMixin";
export default {
  mixins:[LoginMixin],
  methods: {
    login() {
      if ( !this.emailMessage && !this.passwordMessage) {
        console.log("showwwww the message");
        return;
      }
      this.submit = true;
    },
  },
};
</script>
