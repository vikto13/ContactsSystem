<template>
  <div v-if="!isSended">
    <h1>Priminti slaptažodį</h1>
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
    <div class="mb-3">
      <button class="btn w-100" @click="() => send()">Pateikti</button>
    </div>
  </div>
  <div v-else>
    <h1>Žinutė išsiųsta</h1>
    <p>Patikrinkite elektroninį paštą</p>
  </div>
</template>
<script>
import { LoginMixin } from "../views/mixins/LoginMixin";
import { mapActions } from "vuex";
export default {
  mixins: [LoginMixin],
  data() {
    return {
      isSended: false,
    };
  },
  methods: {
    ...mapActions(["resetPassword"]),
    async send() {
      if (this.emailMessage) {
        this.submit = true;
        return;
      }

      try {
        await this.resetPassword(this.email);
        this.isSended = true;
        return;
      } catch {}
    },
  },
};
</script>
