<template>
  <div>
    <slot></slot>
    <div style="margin: 2%">
      <h1>Kontaktų sistema</h1>
      <div class="row">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <input-box-icon>
            <input
              v-model="contactSearch"
              type="text"
              class="form-control"
              placeholder="Ieškoti kontakto"
              style="background-color: #f1f2f4"
              v-debounce:1500="searching"
            />
          </input-box-icon>
        </div>
        <div class="col-4 col-md-1 align-self-center margin d-flex">
          <md-menu md-size="medium" md-align-trigger class="d-flex flex-wrap">
            <md-button
              class="md-icon-button md-raised ml-3 edit-btn"
              md-menu-trigger
            >
              <md-icon style="color: white">filter_alt</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item
                v-for="(option, index) in optionsForPaginate"
                :disabled="sizeOfPaginate == option"
                :key="index"
                @click="() => setPaginate(option)"
                >{{ option }}</md-menu-item
              >
              <md-menu-item
                :value="contacts.length"
                :disabled="sizeOfPaginate == contacts.length"
                @click="() => setPaginate(contacts.length)"
                >visi</md-menu-item
              >
            </md-menu-content>
          </md-menu>

          <div
            v-for="(button, index) in buttons"
            :key="index"
            class="d-flex flex-wrap"
          >
            <md-button
              :key="index"
              class="md-icon-button md-raised ml-3 edit-btn"
              @click="() => button.action(index)"
            >
              <md-icon style="color: #ffffff">{{ button.title }}</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <p style="display: inline">
        Iš viso rasta:
        <span style="font-weight: bold">{{ contacts.length }}</span> kontaktai
      </p>
      <filter-sections></filter-sections>
      <component :is="showComponents[buttons[0].title]"></component>
      <pagination></pagination>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import FilterSections from "../components/FilterSections.vue";
import ContactCards from "../components/ContactCards.vue";
import ContactTables from "../components/ContactTables.vue";
import Pagination from "../components/Pagination.vue";
import InputBoxIcon from "../components/InputBoxIcon.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    InputBoxIcon,
    FilterSections,
    ContactCards,
    Pagination,
    ContactTables,
  },
  async mounted() {
    try {
      await this.fetchContacts();
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      showComponents: {
        table_rows: "contact-cards",
        grid_view: "contact-tables",
      },
      buttons: [
        {
          title: "table_rows",
          action: (index) => {
            let show = {
              table_rows: "grid_view",
              grid_view: "table_rows",
            };
            this.buttons[index].title = show[this.buttons[index].title];
          },
        },
        {
          title: "add",
          action: () => {
            this.triggerDialog("add-contacts");
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["contacts", "optionsForPaginate", "sizeOfPaginate"]),
    contactSearch: {
      get() {
        return this.$store.state.Contact.search;
      },
      set(text) {
        this.$store.state.Contact.search = text;
      },
    },
  },
  methods: {
    ...mapActions([
      "triggerDialog",
      "fetchContacts",
      "searchContactByText",
      "searchContactBySelections",
    ]),
    async searching(value) {
      await this.searchContactBySelections();
      await this.searchContactByText();
    },
    filtering() {
      this.searchContactBySelections();
    },
    setPaginate(size) {
      this.$store.commit("setPagine", size);
    },
  },
};
</script>
<style scoped>
@media (max-width: 767px) {
  .margin {
    margin: 10px 0 15px 0;
  }
}
</style>
