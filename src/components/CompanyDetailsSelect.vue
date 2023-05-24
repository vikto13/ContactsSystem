<template>
  <div class="md-layout-item m-3">
    <h5 style="text-align: center; margin-top: 13%">Kompanijos detalės:</h5>
    <div
      v-for="(select, position) in [
        companyDetails.companies,
        companyDetails.departments,
        companyDetails.divisions,
        companyDetails.groups,
      ]"
      :key="position"
      class="mt-4"
    >
      <label class="form-label">{{ `${select.title}:` }}</label>
      <select v-model="contact[inputs[position].input]" class="form-select">
        <option selected disabled :value="null">
          {{ `Pasirinkite ${select.what}...` }}
        </option>
        <option
          v-for="option in select.all"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <add-image></add-image>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AddImage from "./AddImage.vue";
export default {
  components: {
    AddImage,
  },
  data() {
    return {
      inputs: [
        { input: "companies" },
        { input: "departments" },
        { input: "divisions" },
        { input: "groups" },
      ],
    };
  },
  computed: {
    ...mapGetters(["companyDetails", "contact"]),
  },
};
</script>
