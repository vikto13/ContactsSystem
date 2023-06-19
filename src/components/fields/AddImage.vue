<template>
    <div>
        <button class="btn text-uppercase w-100 text-start" @click="addImage">
            Įkelti nuotrauką
        </button>
        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="(e) => upload(e)"
            style="display: none"
        />
        <img
            :src="getImage"
            alt="Nuotrauka"
            class="mt-2"
            width="190"
            height="190"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['image']),
        getImage() {
            return this.image.result
        },
    },
    methods: {
        ...mapActions(['UPLOAD_IMAGE']),
        addImage() {
            if (!this.image.buttonIsPressed) {
                this.$store.commit('SET_IMAGE_BUTTON_PRESSED', true)
                this.$refs.fileInput.click()
                this.$store.commit('SET_IMAGE_BUTTON_PRESSED', false)
            }
        },
        upload(e) {
            let [image] = e.target.files
            this.UPLOAD_IMAGE(image)
        },
    },
    destroyed() {
        this.$store.commit('REMOVE_IMAGE')
    },
}
</script>
