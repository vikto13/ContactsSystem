<template>
  <div>
    <slot></slot>
    <div style="margin: 2% 8% 2% 8%">
      <h1>Kontaktų sistema</h1>
      <div class="col-md-4" style="padding: 0">
        <input-box-icon>
          <input
            type="text"
            class="form-control"
            placeholder=""
            style="padding-left: 2.5rem; background-color: #f1f2f4"
          />
        </input-box-icon>
      </div>

      <p>Iš viso rasta : 152 kontaktai</p>
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
export default {
  components: {
    NavBar,
    InputBoxIcon,
    FilterSections,
    ContactCards,
    Pagination,
  },
};
</script>
