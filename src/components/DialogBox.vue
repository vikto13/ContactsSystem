<template>
  <md-dialog :md-active.sync="showDialog" style="overflow: auto">
    <div
      style="
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 2rem;
        top: 1rem;
      "
    >
      <md-button class="md-icon-button" @click.stop="showDialog = false">
        <md-icon style="color: white">close</md-icon>
      </md-button>
    </div>
    <md-dialog-content style="overflow: auto">
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
    </md-dialog-content>
  </md-dialog>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import InputBoxIcon from "./InputBoxIcon.vue";
import AddContacts from "./AddContacts.vue";
export default {
  components: {
    InputBoxIcon,
    AddContacts,
  },
  props: {
    showBox: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showDialog: {
      set(value) {
        this.$store.commit("setToShow", value);
      },
      get() {
        return this.$store.state.Dialog.show;
      },
    },
  },
  methods: {
    openGallery() {
      this.isGalleryOpen = true;
    },
    openFilePicker() {
      this.$nextTick(() => {
        this.$refs.fileInput.click(); // Programmatically trigger the file picker
      });
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
<style scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>

<!-- <md-tabs md-dynamic-height>
    <md-tab md-label="General">
      <p></p>
    </md-tab>

    <md-tab md-label="Activity">
      <p></p>
    </md-tab>

    <md-tab md-label="Account">
      <p></p>
    </md-tab>
  </md-tabs> -->
