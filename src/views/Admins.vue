<template>
    <div>
        <slot></slot>
        <div class="m-5">
            <h1 style="font-weight: normal">{{ getTitle }}</h1>
            <field-to-create
                v-show="user.permissions_id.edit_permissions"
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

                    <md-table-cell
                        md-label="Veiksmas"
                        v-if="
                            user.permissions_id.edit_permissions ||
                            user.permissions_id.delete_permissions
                        "
                    >
                        <md-button
                            v-show="user.permissions_id.edit_permissions"
                            class="md-dense md-raised md-primary table-btn edit-btn m-1"
                            @click="() => change(item.id, 0)"
                            >Keisti leidimus</md-button
                        >
                        <md-button
                            class="md-dense md-raised md-primary table-btn edit-btn m-1"
                            @click="() => change(item.id, 1)"
                            v-show="user.permissions_id.edit_permissions"
                            >Redaguoti</md-button
                        >
                        <md-button
                            class="md-dense md-raised md-primary table-btn delete-btn m-1"
                            @click="() => deleting(item.id)"
                            v-show="user.permissions_id.delete_permissions"
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
import FieldToCreate from '../components/fields/FieldToCreate.vue'
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
        ...mapGetters([
            'admin',
            'isLoading',
            'companyDetails',
            'navBar',
            'user',
        ]),
        admins: {
            get() {
                return this.$store.getters.admins
            },
            set() {},
        },
        getTitle() {
            return this.user.permissions_id.edit_permissions
                ? 'Sukurti admin paskyra'
                : 'Admin paskyra'
        },
    },
    methods: {
        ...mapActions([
            'triggerDialog',
            'fetchAdmins',
            'fetchAdmin',
            'setWhatDo',
            'triggerMessage',
            'deleteAdmin',
            'clearAdminData',
            'setAdminRole',
        ]),
        async deleting(id) {
            await this.fetchAdmin(id)
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
            await this.fetchAdmin(id)
            action || (await this.$store.commit('setAdminRole'))
            this.setWhatDo(action)
            this.triggerDialog('add-admin')
        },
    },
}
</script>
