<template>
  <div>
    <h1>Priminti slaptažodį</h1>
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
    <div class="mb-3">
      <button class="btn w-100" @click="() => login()">Pateikti</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",

      submit: false,
    };
  },
  computed: {
    addingBottom() {
      return `${this.remind ? "50%" : "25%"}`;
    },
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
      } else if (!(this.emailMessage || this.passwordMessage)) {
        console.log("registration is working");
        return;
      }
      this.submit = true;
    },
  },
};
</script>
