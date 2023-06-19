<template>
    <div style="width: 42rem">
        <div :class="true ? 'md-layout' : null">
            <contact-fields v-show="true"></contact-fields>
            <company-details-select></company-details-select>
        </div>
    </div>
</template>
<script>
import CompanyDetailsSelect from '../CompanyDetailsSelect.vue'
import ContactFields from '../ContactFields.vue'
export default {
    components: {
        ContactFields,
        CompanyDetailsSelect,
    },
    destroyed() {
        this.$store.commit('REMOVE_EMPLOYEE')
        this.$store.commit('SET_TO_SUBMIT_MESSAGE')
    },
}
</script>
