<template>
  <!-- <input-box-icon
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
        />
      </input-box-icon> -->
  <div v-if="!isSended">
    <h1>Priminti slaptažodį</h1>
    <div class="forms-inputs mb-4">
      <input-box-icon
        :icon-name="'mail'"
        :title="'Elektroninis paštas:'"
        :bottom-text="messageById({ email })"
        :is-not-valid="isInvalid(email)"
      >
        <input
          v-model="email"
          type="text"
          class="form-control input-w"
          :class="{ 'is-invalid': isInvalid(email) }"
          placeholder="Įveskite el pašto adresą..."
        />
      </input-box-icon>
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
      this.submit = true;

      // try {
      //   await this.resetPassword(this.email);
      //   this.isSended = true;
      //   return;
      // } catch {}
    },
  },
};
</script>
