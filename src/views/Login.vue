<template>
  <div class="darkBlue" style="position: fixed; width: 100%; height: 100%">
    <div class="md-layout md-gutter md-alignment-center" style="height: 100%">
      <md-button
        class="md-icon-button md-raised"
        @click="$router.push('/')"
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
        <div
          class="card px-4"
          style="padding-top: 5%"
          :style="{ 'padding-bottom': addingBottom }"
        >
          <component :is="screens[$route.params.info]"></component>
        </div>
      </divide-components>
    </div>
  </div>
</template>
<script>
import AdminLogin from "../components/AdminLogin.vue";
import Card from "../components/Card.vue";
import DivideComponents from "../components/DivideComponents.vue";
import InputBoxIcon from "../components/InputBoxIcon.vue";
import RemindPassword from "../components/RemindPassword.vue";
import UpdatePassword from "../components/UpdatePassword.vue";
export default {
  components: {
    DivideComponents,
    Card,
    InputBoxIcon,
    AdminLogin,
    RemindPassword,
  },
  data() {
    return {
      email: "",
      password: "",

      screens: {
        "auth-with-password": "admin-login",
        "forgot-password": "remind-password",
        "auth-refresh": "update-password",
      },

      submit: false,
      remind: false,
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
