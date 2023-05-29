<template>
  <form>
    <h1 class="mb-4">Pakeisti slaptažodį</h1>
    <div class="forms-inputs">
      <span> Nujas slaptažodis: </span>
      <input-box-icon
        :icon-name="'lock'"
        :bottom-text="passwordMessage(password)"
        :is-not-valid="isInvalid({ password })"
      >
        <input
          v-model="password"
          type="password"
          class="form-control input-w"
          :class="{ 'is-invalid': isInvalid({ password }) }"
          placeholder="Įveskite naują slaptažodį..."
          autocomplete="new-password"
          
        />
      </input-box-icon>
    </div>
    <div class="forms-inputs mb-4">
      <span>Pakartoti naują slaptažodį: </span>
      <input-box-icon
        :icon-name="'lock'"
        :bottom-text="messageById({ second_password: password })"
        :is-not-valid="showCompareMessage(secPassword, password)"
      >
        <input
          v-model="secPassword"
          type="password"
          class="form-control input-w"
          :class="{ 'is-invalid': showCompareMessage(password, secPassword) }"
          placeholder="Pakartoti naują slaptažodį..."
          autocomplete="new-password"
        />
      </input-box-icon>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="() => change()">Keisti</button>
    </div>
  </form>
</template>
<script>
import { LoginMixin } from "../views/mixins/LoginMixin";
export default {
  mixins: [LoginMixin],
  methods: {
    change() {
      if (
        !this.showCompareMessage(this.secPassword, this.password) &&
        !this.isInvalid({ password: this.password })
      ) {
        this.submit = true;
        return;
      }
      try {
        
      } catch {
        
      }
    },
  },
};
</script>
