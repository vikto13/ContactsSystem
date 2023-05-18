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
        <div class="col-6 col-md-4 align-self-center" style="padding: 0">
          <md-button
            v-for="(button, index) in buttons"
            :key="index"
            class="md-icon-button md-raised ml-3"
            @click=""
            style="background-color: #0054a6 !important"
          >
            <md-icon style="color: #ffffff">{{ button }}</md-icon>
          </md-button>

          <md-button
            class="md-icon-button md-raised ml-3"
            style="background-color: #0054a6 !important"
            @click="() => triggerDialog()"
          >
            <md-icon style="color: #ffffff">add</md-icon>
          </md-button>
        </div>
      </div>
      <p>Iš viso rasta : 152 kontaktai</p>
      <DialogBox></DialogBox>
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
import DialogBox from "../components/DialogBox.vue";
import { mapActions, mapGetters } from "vuex";
import { triggerRef } from "vue";
export default {
  data() {
    return {
      buttons: ["filter_alt", "calendar_month"],
      showBox: false,
    };
  },
  computed: {
    ...mapGetters(["showDialog"]),
  },
  components: {
    NavBar,
    InputBoxIcon,
    FilterSections,
    ContactCards,
    Pagination,
    DialogBox,
  },
  methods: {
    ...mapActions(["triggerDialog"]),
  },
};
</script>
