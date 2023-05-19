<template>
  <div>
    <slot></slot>
    <message></message>
    <div class="container mt-2">
      <h1>Įmonės</h1>

      <div class="mb-3" style="display: flex; align-items: center">
        <md-button
          md-menu-trigger
          class="md-icon-button md-raised"
          style="background-color: #0054a6ff !important"
          @click="edit(null)"
        >
          <md-icon style="color: #ffff">add</md-icon>
        </md-button>
        Pridėti naują įmonę
      </div>

      <p>Iš viso rasta: {{ companyList.length }} įmonių</p>
      <divide-components
        v-for="(company, index) in companyList"
        :key="index"
        :size-xl="40"
        :size-l="50"
        :size-s="90"
        :size-m="60"
      >
        <md-card
          class="pl-5 mt-3"
          style="
            height: 5rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          "
        >
          <div style="flex: 1">
            {{ company.name }}
          </div>
          <div>
            <md-button
              md-with-hover
              class="md-icon-button md-raised"
              style="background-color: #1f3f77 !important"
              @click="() => edit(5)"
            >
              <md-icon style="color: white">edit</md-icon>
            </md-button>

            <md-button
              class="md-icon-button md-raised ml-3"
              style="background-color: #a61a11 !important"
            >
              <md-icon style="color: white">delete</md-icon>
            </md-button>
          </div>
          <h1>{{ user.name }}</h1>
        </md-card>
      </divide-components>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
import DivideComponents from "../components/DivideComponents.vue";
import Message from "../components/Message.vue";

export default {
  components: {
    Card,
    DivideComponents,
    Message,
  },
  computed: {
    ...mapGetters(["user", "companyList"]),
  },
  async created() {
    await this.fetchCompanies();
    console.log(this.companyList.length);
  },
  methods: {
    ...mapActions(["triggerDialog", "addCompanyName", "fetchCompanies"]),
    edit(id) {
      this.$store.commit("setId", id);
      this.triggerDialog("add-company");
    },
  },
};
</script>
