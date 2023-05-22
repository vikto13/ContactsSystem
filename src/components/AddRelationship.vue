<template>
  <div class="md-layout-item m-3">
    <h5 class="mt-5" style="text-align: center">Pridėti struktūrą</h5>
    <input-box-icon :title="`Pavadinimas:`">
      <input
        type="text"
        class="form-control"
        :placeholder="'Įveskite pavadinimą...'"
        style="background-color: #f1f2f4"
      />
    </input-box-icon>
    <select class="form-select mt-4" style="width: 30rem">
      <option selected disabled>Tipas</option>
      <option v-for="(option, value) in items" :key="value" :value="selected">
        {{ option }}
      </option>
    </select>
  </div>
</template>
<script>
import InputBoxIcon from "./InputBoxIcon.vue";
export default {
  components: {
    InputBoxIcon,
  },
  data() {
    return {
      selected: "",
      items: ["Būstinė", "Divizija", "Departamentas", "Grupė"],
    };
  },
};
</script>
