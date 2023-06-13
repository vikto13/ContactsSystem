<template>
    <md-dialog :md-active.sync="dialog.show">
        <div
            style="
                display: flex;
                justify-content: flex-end;
                position: absolute;
                right: 2rem;
                top: 1rem;
            "
        >
            <md-button class="md-icon-button btn" @click="dialog.show = false">
                <md-icon class="text-white">close</md-icon>
            </md-button>
        </div>
        <md-dialog-content>
            <component :is="dialog.show ? dialog.screen : null"></component>
        </md-dialog-content>
    </md-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import AddContacts from '../boxForCreate/AddContacts.vue'
import AddCompany from '../boxForCreate/AddCompany.vue'
import AddAdmin from '../boxForCreate/AddAdmin.vue'
import AddRelationship from '../boxForCreate/AddRelationship.vue'
import AddOffice from '../boxForCreate/AddOffice.vue'

export default {
    components: {
        AddContacts,
        AddCompany,
        AddAdmin,
        AddRelationship,
        AddOffice,
    },
    computed: {
        ...mapGetters(['dialog']),
    },
}
</script>
