<template>
  <div class="md-layout-item m-3">
    <h5 class="mt-5" style="width: 32rem; text-align: center">Pridėti ofisą</h5>
    <input-box-icon :title="`Pavadinimas:`">
      <input
        type="text"
        class="form-control"
        :placeholder="'Įveskite pavadinimą...'"
        style="background-color: #f1f2f4"
      />
    </input-box-icon>
    <input-box-icon :title="`Gatvė:`">
      <input
        type="text"
        class="form-control"
        :placeholder="'Įveskite pavadinimą...'"
        style="background-color: #f1f2f4"
      />
    </input-box-icon>
    <input-box-icon :title="`Pavadinimas:`">
      <input
        type="text"
        class="form-control"
        :placeholder="'Įveskite pavadinimą...'"
        style="background-color: #f1f2f4"
      />
    </input-box-icon>
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
