<template>
    <div>
        <slot></slot>
        <div class="m-5">
            <h1 style="font-weight: normal">{{ navBar.admins.textCreate }}</h1>
            <field-to-create
                :text="'Sukurti naują admin paskyrą'"
                @pressed="triggerDialog('add-admin')"
                :title="'Sukurti admin paskyrą'"
            >
            </field-to-create>
            <md-table
                v-if="admins != null && admins.length"
                v-model="admins"
                md-sort="name"
                md-sort-order="asc"
                md-card
                md-fixed-header
                class="mt-5 table-footer"
            >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Vardas" md-sort-by="name">{{
                        item.name
                    }}</md-table-cell>
                    <md-table-cell md-label="Email" md-sort-by="email">{{
                        item.email
                    }}</md-table-cell>

                    <md-table-cell md-label="Veiksmas">
                        <md-button
                            class="md-dense md-raised md-primary table-btn edit-btn"
                            @click="() => change(item.id, 0)"
                            >Keisti leidimus</md-button
                        >
                        <md-button
                            class="md-dense md-raised md-primary table-btn edit-btn"
                            @click="() => change(item.id, 1)"
                            >Redaguoti</md-button
                        >
                        <md-button
                            class="md-dense md-raised md-primary table-btn delete-btn"
                            @click="() => deleting(item.id)"
                            >Ištrinti</md-button
                        >
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <h5 v-else-if="admins != null" style="text-align: center">
                {{ navBar.admins.textEmpty }}
            </h5>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FieldToCreate from '../components/FieldToCreate.vue'
export default {
    components: {
        FieldToCreate,
    },
    async mounted() {
        try {
            await this.fetchAdmins()
        } catch {
            this.showMessage()
        }
    },
    computed: {
        ...mapGetters(['admin', 'isLoading', 'companyDetails', 'navBar']),
        admins: {
            get() {
                return this.$store.getters.admins
            },
            set() {},
        },
    },
    methods: {
        ...mapActions([
            'triggerDialog',
            'fetchAdmins',
            'setAdmin',
            'setWhatDo',
            'triggerMessage',
            'deleteAdmin',
            'clearAdminData',
            'showLoading',
            'setAdminRole',
        ]),
        async deleting(id) {
            await this.setAdmin(id)
            this.triggerMessage({
                title: 'Ar tikrai norite ištrinti adminą?',
                content: `Admino vardas: ${this.admin.name}`,
                action: async () => {
                    await this.deleteAdmin()
                    await this.fetchAdmins()
                },
                cancelAction: () => {
                    this.clearAdminData()
                },
            })
        },
        async change(id, action) {
            await this.setAdmin(id)
            action || (await this.$store.commit('setAdminRole'))
            this.setWhatDo(action)
            this.triggerDialog('add-admin')
        },
    },
}
</script>
<style scoped></style>
