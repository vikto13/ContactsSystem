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
          style="background-color: #f1f2f4; border-left-width: 0"
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
          style="background-color: #f1f2f4; border-left-width: 0"
        />
      </input-box-icon>
      <span v-show="showPasswordMessage" style="color: red">
        {{ passwordMessage }}
      </span>
    </div>
    <div style="padding-bottom: 1rem">
      Pamiršote slaptažodį?
      <a href="#/users/auth-refresh"> Pakeisti slaptažodį </a>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="() => login()">Prisijungti</button>
    </div>
  </div>
</template>
<script>
import { LoginMixin } from "../views/mixins/LoginMixin";
import { mapActions } from "vuex";
export default {
  mixins: [LoginMixin],
  methods: {
    ...mapActions(["authWithPassword"]),
    async login() {
      if (!this.emailMessage && !this.passwordMessage) {
        try {
          await this.authWithPassword({
            email: this.email,
            password: this.password,
          });
          this.$router.push("/users/records");
          return;
        } catch (err) {
          console.log(err);
        }
      }
      this.submit = true;
    },
  },
};
</script>
