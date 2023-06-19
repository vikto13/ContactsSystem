<template>
    <div v-show="alert.showAlert" class="alert alert-danger" role="alert">
        {{ alert.message[alert.showMessage] }}
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['alert']),
    },
}
</script>
