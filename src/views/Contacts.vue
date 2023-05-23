<template>
  <div>
    <slot></slot>
    <div style="margin: 2% 8% 2% 8%">
      <h1>Kontaktų sistema</h1>
      <div class="row">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <input-box-icon>
            <input
              type="text"
              class="form-control"
              placeholder="Ieškoti kontakto"
              style="background-color: #f1f2f4"
            />
          </input-box-icon>
        </div>
        <div class="col-4 col-md-1 align-self-center" style="display: flex">
          <div class="d-flex flex-wrap">
            <md-button
              v-for="(button, index) in buttons"
              :key="index"
              class="md-icon-button md-raised ml-3"
              @click=""
              style="background-color: #0054a6 !important"
            >
              <md-icon style="color: #ffffff">{{ button }}</md-icon>
            </md-button>
          </div>

          <div class="d-flex flex-wrap">
            <VueDatePicker v-model="date">
              <template #activator>
                <md-button
                  class="md-icon-button md-raised ml-3"
                  style="background-color: #0054a6 !important"
                  ref="activator"
                  type="button"
                >
                  <md-icon style="color: #ffffff">calendar_month</md-icon>
                </md-button>
              </template>
            </VueDatePicker>
          </div>
          <div class="d-flex flex-wrap">
            <md-button
              class="md-icon-button md-raised ml-3"
              style="background-color: #0054a6 !important"
              @click="() => triggerDialog('add-contacts')"
            >
              <md-icon style="color: #ffffff">add</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <p style="display: inline">
        Iš viso rasta:
        <span style="font-weight: bold">{{ contacts.length }}</span> kontaktai
      </p>
      <filter-sections></filter-sections>
      <contact-cards></contact-cards>
      <pagination></pagination>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import FilterSections from "../components/FilterSections.vue";
import ContactCards from "../components/ContactCards.vue";
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
      date: new Date(),
      buttons: ["filter_alt"],
      showBox: false,
      showPicker: true,
      selectedDate: "",
      date: new Date(2016, 9, 16),
      selectedDate: null,
      calendarVisible: false,
    };
  },
  computed: {
    ...mapGetters(["contacts"]),
  },
  methods: {
    ...mapActions(["triggerDialog", "fetchContacts"]),
    showCalendar() {
      this.calendarVisible = true;
    },
  },
};
</script>

