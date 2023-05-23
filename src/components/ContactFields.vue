<template>
        <div class="md-layout-item m-2" style="">
          <h3 class="mb-5 mt-3">Pridėti naują kontaktą:</h3>
          <div v-for="(table, index) in inputs" :key="index" >
            <h5 v-if="table.name" class="mt-5">{{ table.name }}</h5>
            <input-box-icon
              v-for="(column, index) in table.boxs"
              :key="index"
              :icon-name="column.icon"
              :title="`${column.title}:`"
            >
              <input
              v-model="contact[column.input]"
                type="text"
                class="form-control"
                :placeholder="column.placeholder"
                style="background-color: #f1f2f4"
                :style="{ 'border-left-width': column.icon ? 0 : null}"
              />
            </input-box-icon>
          </div>
        </div>
  </template>
  <script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import AddImage from './AddImage.vue';
  import InputBoxIcon from "./InputBoxIcon.vue";
  import {CompanyState} from "../store/initState/CompanyState.js"
  export default {
    components: {
      InputBoxIcon,
      AddImage
    },
    computed: {
    ...mapGetters(["companyDetails","contact"])
      },
    data() {
      return {
        inputs: [
          {
            name: "",
            boxs: [
              { title: "Vardas", placeholder: "Įveskite vardą...",input:'name' },
              { title: "Pavardė", placeholder: "Įveskite pavardę...",input:'surname' },
              { title: "Pozicija", placeholder: "Įveskite poziciją...",input:'position'},
            ],
          },
          {
            name: "Kontaktinė informacija",
            boxs: [
              {
                title: "Elektroninis paštas",
                placeholder: "Įveskite el.paštą...",
                icon: "mail",
                input:'email'
              },
              {
                title: "Telefono numeris",
                placeholder: "Įveskite telefono numerį...",
                icon: "phone",
                input:'phone_number'
              },
            ],
          },
        ],
        
      };
    },
  };
  </script>
  