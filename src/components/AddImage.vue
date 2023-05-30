<template>
  <div>
    <label for="image-upload" class="btn w-100 mt-4 text-start">
      ĮKELTI NUOTRAUKĄ
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        @change="uploadImage"
        style="display: none"
      />
    </label>

    <p>{{ image.name }}</p>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["image"]),
  },
  methods: {
    ...mapActions(["uploadImage"]),
  },
  destroyed() {
    this.$store.commit("clearImageState");
  },
};
</script>
