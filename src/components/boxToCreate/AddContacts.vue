<template>
    <div style="width: 42rem">
        <alert-message class="mt-4"></alert-message>
        <div :class="true ? 'md-layout' : null">
            <contact-fields v-show="true"></contact-fields>
            <company-details-select></company-details-select>
        </div>
    </div>
</template>
<script>
import AlertMessage from '../fields/AlertMessage.vue'
import CompanyDetailsSelect from '../CompanyDetailsSelect.vue'
import ContactFields from '../ContactFields.vue'
export default {
    components: {
        ContactFields,
        CompanyDetailsSelect,
        AlertMessage,
    },
    destroyed() {
        this.$store.commit('clearEmployee')
        this.$store.commit('submitMessage')
    },
}
</script>
