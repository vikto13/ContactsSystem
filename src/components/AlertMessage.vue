<template>
    <div v-show="alert.showAlert" class="alert alert-danger" role="alert">
        {{ alert.message[alert.showMessage] }}
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['alert']),
    },
    methods: {
        ...mapActions(['disableAlert']),
    },
}
</script>
