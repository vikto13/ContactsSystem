<template>
    <!-- v-show="alert.showAlert"  -->
    <div v-show="true" class="alert alert-danger" role="alert">
        {{ alert.message[alert.showMessage] }}
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['alert']),
    },
}
</script>
