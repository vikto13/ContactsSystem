<template>
    <div>
        <button class="btn text-uppercase w-100 text-start" @click="addImage">
            Įkelti nuotrauką
        </button>
        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="uploadImage"
            style="display: none"
        />
        <img :src="getImage" alt="Nuotrauka" class="mt-2" />
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
        ...mapActions(['uploadImage']),
        addImage() {
            if (!this.image.buttonIsPressed) {
                this.$store.commit('imageButtonPressed', true)
                this.$refs.fileInput.click()
                this.$store.commit('imageButtonPressed', false)
            }
        },
    },
    destroyed() {
        this.$store.commit('clearImageState')
    },
}
</script>
