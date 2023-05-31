<template>
  <div
    v-show="isLoading"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgb(255, 255, 255, 0.4);
      z-index: 9998;
    "
  >
    <div style="position: absolute; z-index: 9999; left: 50%; top: 5rem">
      <md-progress-spinner
        :md-diameter="100"
        :md-stroke="10"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoading"]),
  },
};
</script>
<style>
.md-progress-spinner.md-theme-default .md-progress-spinner-circle {
  stroke: #0054a6;
}
</style>
