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
          :class="{ 'is-invalid': isInvallid(email) }"
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
          :class="{ 'is-invalid': isInvallid(password) }"
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
import InputBoxIcon from "./InputBoxIcon.vue";
export default {
  components: {
    InputBoxIcon,
  },
  data() {
    return {
      email: "",
      password: "",

      submit: false,
    };
  },
  computed: {
    emailMessage() {
      return !this.email
        ? `Elektroninis paštas turi būti įvestas`
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
        ? `Elektroninis paštas turi būti validus`
        : null;
    },
    passwordMessage() {
      return !this.password
        ? `Slaptažodis turi būti įvestas`
        : this.password.length < 8
        ? `Slaptažodis turi būti sudarytas iš 8 raidžių`
        : null;
    },
    showEmailMessage() {
      return (
        this.submit &&
        (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      );
    },
    showPasswordMessage() {
      return this.submit && (!this.password || this.password.length < 8);
    },
  },
  methods: {
    isInvallid(input) {
      return !input && this.submit;
    },
    login() {
      if (this.remind && !this.emailMessage) {
        console.log("showwwww the message");
        return;
      }
      this.submit = true;
    },
  },
};
</script>
