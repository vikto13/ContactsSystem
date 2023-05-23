<template>
  <div class="md-layout md-gutter md-alignment-center" style="margin-top: 2rem">
    <divide-components :size-l="30" :size-m="30" :size-xl="20">
      <md-button
        class="md-dense md-raised md-primary text-uppercase"
        style="width: 100%; "
        :style="{'opacity':currentPage?null:0}"
        :disabled="!currentPage"
        @click="currentPage=0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          style="width: 2rem"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
        Praeitas puslapis
      </md-button>
    </divide-components>
    <divide-components :size-l="30" :size-m="30" :size-xl="20">
      <md-button
        class="md-dense md-raised md-primary text-uppercase"
        style="width: 100%"
        @click="currentPage=1"
        :style="{'opacity':!goNext?null:0}"
        :disabled="goNext"
      >
        Kitas puslapis
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          style="width: 2rem"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </md-button>
    </divide-components>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import DivideComponents from "./DivideComponents.vue";

export default {
  components: {
    DivideComponents
  },
  computed: {
    ...mapGetters(['contacts','sizeOfPaginate']),
    goNext() {
      return this.contacts.length<=(this.currentPage*this.sizeOfPaginate+this.sizeOfPaginate)
    },
    currentPage: {
      set(isNext) {
        this.$store.commit(isNext?"nextPage":'previuosPage')
      }, get() {
      return this.$store.getters.currentPage
    }
   }
  },
  data() {
    return {};
  },
};
</script>

<style>
.md-button {
  background-color: #1f3f77 !important;
}
</style>
