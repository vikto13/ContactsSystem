<template>
  <div>
    <label
      for="image-upload"
      style="
        background-color: #1f3f77;
        color: white;
        width: 100%;
        margin: 0;
        margin-top: 1rem;
        text-align: start;
        padding-left: 5%;
        padding: 3%;
        display: inline-block;
        cursor: pointer;
      "
    >
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
   this.$store.commit("clearImageState")
  },
};
</script>
