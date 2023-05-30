<template>
  <form>
    <h1>Admin prisijungimas</h1>
    <alert-message></alert-message>
    <div class="forms-inputs">
      <input-box-icon
        :icon-name="'mail'"
        :title="'Elektroninis paštas:'"
        :bottom-text="messageById({ email })"
        :is-not-valid="isInvalid(email)"
      >
        <input
          v-model="email"
          type="text"
          class="form-control table-footer border-left-0"
          :class="{ 'is-invalid': isInvalid(email) }"
          placeholder="Įveskite el pašto adresą..."
          autocomplete="username"
        />
      </input-box-icon>
    </div>
    <div class="forms-inputs mb-4">
      <input-box-icon
        :icon-name="'lock'"
        :title="'Slaptažodis:'"
        :bottom-text="messageById({ password })"
        :is-not-valid="isInvalid(password)"
      >
        <input
          v-model="password"
          type="password"
          :class="{ 'is-invalid': isInvalid(password) }"
          class="form-control table-footer border-left-0"
          placeholder="Įveskite slaptažodį..."
          autocomplete="current-password"
        />
      </input-box-icon>
    </div>
    <div style="padding-bottom: 1rem">
      Pamiršote slaptažodį?
      <a href="#/users/auth-refresh"> Pakeisti slaptažodį </a>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="() => login()">Prisijungti</button>
    </div>
  </form>
</template>
<script>
import { LoginMixin } from "../views/mixins/LoginMixin";
import { mapActions, mapGetters } from "vuex";
import AlertMessage from './AlertMessage.vue';

export default {
  components: {
    AlertMessage
  },
  mixins: [LoginMixin],
  computed: {
    ...mapGetters(["user","alert"]),
  },
  methods: {
    ...mapActions(["authWithPassword", "showAlert","disableAlert"]),
    async login() {
      if (!(this.password && this.email)) {
        this.submit = true;
        return;
      }
      try {
        await this.authWithPassword({
          email: this.email,
          password: this.password,
        });

        this.$router.push("/contacts/records");
      } catch (err) {
        if (err.status == 400) {
          this.showAlert(400);
        } else {
          this.showAlert(404);
        }
      }
    },
  },
  destroyed() {
    this.alert.showAlert && this.disableAlert();
  }
};
</script>
