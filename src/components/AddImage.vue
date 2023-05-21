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

    <p>{{ images }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewImage: null,
      images: null,
    };
  },
  methods: {
    uploadImage(e) {
      const [image] = e.target.files;
      this.images = image.name;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        // console.log(this.previewImage);
      };
    },
  },
};
</script>
