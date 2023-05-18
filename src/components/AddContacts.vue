<template>
  <div class="md-layout m-3">
    <div class="md-layout-item m-2" style="">
      <h3 class="mb-3 mt-3">Pridėti naują kontaktą:</h3>
      <div v-for="(table, index) in inputs" :key="index">
        <h5 v-if="table.name" class="mt-4">{{ table.name }}</h5>
        <input-box-icon
          v-for="(column, index) in table.boxs"
          :key="index"
          :icon-name="column.icon"
          :title="`${column.title}:`"
        >
          <input
            type="text"
            class="form-control"
            :placeholder="column.placeholder"
            style="background-color: #f1f2f4"
            :style="{ 'border-left-width': column.icon ? 0 : null }"
          />
        </input-box-icon>
      </div>
    </div>

    <div v-for="(box, index) in selects" class="md-layout-item m-3">
      <h5 class="mt-4" style="text-align: center">
        {{ box.name }}
      </h5>
      <div v-for="(select, position) in box.items" class="mt-4">
        <label class="form-label">{{ `${select.title}:` }}</label>
        <select class="form-select" style="width: 100%">
          <option selected>{{ select.placeholder }}</option>
          <option v-for="(option, value) in select.options" :value="value">
            {{ option }}
          </option>
        </select>
      </div>

      <md-button
        style="
          background-color: #1f3f77 !important;
          color: white;
          width: 100%;
          margin: 0;
          margin-top: 1rem;
          text-align: start;
          padding-left: 5%;
        "
        @click="openFilePicker"
      >
        ĮKELTI NUOTRAUKĄ
      </md-button>
    </div>
  </div>
</template>
<script>
import InputBoxIcon from "./InputBoxIcon.vue";
import { mapActions } from "vuex";
export default {
  components: {
    InputBoxIcon,
  },

  methods: {
    openGallery() {
      this.isGalleryOpen = true;
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const imageUrl = e.target.result;
          this.images.push(imageUrl);
        };
        fileReader.readAsDataURL(files[0]);
      }
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const imageUrl = e.target.result;
          this.images.push(imageUrl);
        };
        fileReader.readAsDataURL(files[0]);
      }
    },
  },

  //   <div style="display: flex; justify-content: center">
  //     <md-button
  //       style="background-color: #1f3f77 !important; color: white"
  //       @click="showDialog = false"
  //       >PRIDĖTI</md-button
  //     >
  //   </div>

  data() {
    return {
      isGalleryOpen: false,
      images: [],
      inputs: [
        {
          name: "",
          boxs: [
            { title: "Vardas", placeholder: "Įveskite vardą..." },
            { title: "Pavardė", placeholder: "Įveskite pavardę..." },
            { title: "Pozicija", placeholder: "Įveskite poziciją..." },
          ],
        },
        {
          name: "Kontaktinė informacija",
          boxs: [
            {
              title: "Elektroninis paštas",
              placeholder: "Įveskite el.paštą...",
              icon: "mail",
            },
            {
              title: "Telefono numeris",
              placeholder: "Įveskite telefono numerį...",
              icon: "phone",
            },
          ],
        },
      ],
      selects: [
        {
          name: "Kompanijos detalės",
          items: [
            {
              title: "Kompanija",
              placeholder: "Pasirinkite kompaniją...",
              options: ["one", "two"],
            },
            {
              title: "Divizija",
              placeholder: "Pasirinkite diviziją...",
              options: ["one", "two"],
            },
            {
              title: "Departamentas",
              placeholder: "Pasirinkite departamentą...",
              options: ["one", "two"],
            },
            {
              title: "Grupė",
              placeholder: "Pasirinkite grupę...",
              options: ["one", "two"],
            },
          ],
        },
      ],
    };
  },
};
</script>
