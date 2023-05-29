<template>
  <form>
    <h1>Admin prisijungimas</h1>
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
          class="form-control"
          :class="{ 'is-invalid': isInvalid(email) }"
          placeholder="Įveskite el pašto adresą..."
          style="background-color: #f1f2f4; border-left-width: 0"
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
          class="form-control"
          placeholder="Įveskite slaptažodį..."
          style="background-color: #f1f2f4; border-left-width: 0"
          autocomplete="current-password"
        />
      </input-box-icon>
    </div>
    <div style="padding-bottom: 1rem">
      Pamiršote slaptažodį?
      <a href="#/users/update-password"> Pakeisti slaptažodį </a>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="() => login()">Prisijungti</button>
    </div>
  </form>
</template>
<script>
import { LoginMixin } from "../views/mixins/LoginMixin";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [LoginMixin],
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["authWithPassword"]),
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
          console.log("not authorized");
        } else {
          console.log("something went wrong");
        }
      }
    },
  },
};
</script>
