<template>
  <div class="md-layout md-gutter md-alignment-center">
    <divide-components v-for="(filter, index) in searchBox" :key="index">
      <label class="form-label">{{ filter.title }}: </label>
      <select class="form-select elipses" aria-label="Default select example">
        <option selected>
          {{ filter.selectionTitle }}
        </option>
        <option
          v-for="(select, position) in filter.options"
          :key="position"
          value="1"
        >
          {{ select }}
        </option>
      </select>
    </divide-components>
  </div>
</template>
<script>
import DivideComponents from "./DivideComponents.vue";
export default {
  components: {
    DivideComponents,
  },
  data() {
    return {
      searchBox: [
        {
          title: "Įmonė",
          selectionTitle:
            "Testingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
          options: [
            "Sometdccdsssssssssdfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshing",
            "icdsssssdn",
          ],
        },
        {
          title: "Divizija",
          selectionTitle: "Filtruoti divizijas",
          options: ["Somethidcssssssng", "iddcsssssssssssn"],
        },
        {
          title: "Departamentas",
          selectionTitle: "Filtruoti departamentus",
          options: ["Somethdcsssssing", "idcsdn"],
        },
        {
          title: "Grupė",
          selectionTitle: "Filtruoti grupes",
          options: ["Something", "idn"],
        },
        {
          title: "Adresus",
          selectionTitle: "Filtruoti adresus",
          options: ["Something", "idn"],
        },
      ],
    };
  },
};
</script>

<style>
.elipses {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
