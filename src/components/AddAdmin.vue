<template>
    <div>
      <div class="md-layout">
        <div class="md-layout-item m-2">
          <h3 class="mb-3 mt-3">Pridėti naują admin paskyrą:</h3>
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
          
 <add-image></add-image>
        </div>
  
        <div
          v-for="(box, index) in selects"
          :key="index"
          class="md-layout-item m-3 pt-5"
        >
        <md-checkbox v-for="(item,index) in box.items" :key="index" v-model="array" :value="index" class="md-primary" style="display: flex;">{{ item }}</md-checkbox>
          <!-- <h5 class="mt-4" style="text-align: center">
            {{ box.name }}
          </h5>
          <div
            v-for="(select, position) in box.items"
            :key="position"
            class="mt-4"
          >
            <label class="form-label">{{ `${select.title}:` }}</label>
            <select class="form-select" style="width: 100%">
              <option selected>{{ select.placeholder }}</option>
              <option
                v-for="(option, value) in select.options"
                :key="value"
                :value="value"
              >
                {{ option }}
              </option>
            </select>
          </div> -->
  
        </div>
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
      >
        PRIDĖTI
      </md-button>
    </div>
  </template>
  <script>
  import { mapState, mapActions, mapGetters } from "vuex";
import AddImage from './AddImage.vue';
  import InputBoxIcon from "./InputBoxIcon.vue";
  export default {
    components: {
            InputBoxIcon,
            AddImage
    },
  
    data() {
      return {
     
            array: [],
        inputs: [
        
          {
            name: "",
                  boxs: [
                  {
                title: "Vardas",
                placeholder: "Įveskite vardą...",
              },
              {
                title: "Elektroninis paštas",
                placeholder: "Įveskite el.paštą...",
                icon: "mail",
              },
          
            ],
          },
        ],
        selects: [
          {
            name: "Administracinės teisės",
            items: [
                  "Redaguoti ir kurti kontaktus",
                  "Trinti kontaktus",
                  "Redaguoti ir kurti įmones",
                  "Trinti įmones",
                  "Redaguoti ir kuti būstines",
                  "Trinti būstines",
                  "Redaguoti ir kuurti struktūras",
                  "Trinti struktūras",
                  "Skaityti admin paskyras",
                  "Redaguoti ir kurti administracines teises",
             "Trinti admin paskyras"
            ],
          },
        ],
      };
    },
  };
  </script>
  <style >
  .md-checkbox{
    margin: 3% 0 0 0  !important;
  }
  .md-checked .md-checkbox-container {

    background-color: black;

}

</style>
  