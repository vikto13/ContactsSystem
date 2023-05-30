<template>
  <div class="darkBlue h-100 w-100 position-fixed">
    <div class="md-layout md-gutter md-alignment-center h-100">
      <divide-components
        :size-xs="90"
        :size-s="65"
        :size-m="50"
        :size-l="35"
        :size-xl="20"
      >
        <form class="card px-4 pt-5">
          <h1 class="mb-4">Pakeisti slaptažodį</h1>
          <div class="forms-inputs">
            <span> Naujas slaptažodis: </span>
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
                :class="{
                  'is-invalid': showCompareMessage(password, secPassword),
                }"
                placeholder="Pakartoti naują slaptažodį..."
                autocomplete="new-password"
              />
            </input-box-icon>
          </div>
          <div class="mb-3">
            <button class="btn w-100" @click="() => change()">Keisti</button>
          </div>
        </form>
      </divide-components>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { LoginMixin } from "../views/mixins/LoginMixin";
import DivideComponents from "./DivideComponents.vue";
export default {
  mixins: [LoginMixin],
  components: {
    DivideComponents,
  },
  props: {
    token: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["changePassword"]),
    async change() {
      this.submit = true;

      if (
        this.secPassword !== this.password ||
        this.isInvalid({ password: this.password })
      ) {
        return;
      }
      try {
        await this.changePassword({
          token: this.token,
          password: this.password,
          passwordConfirm: this.secPassword,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
