<template>
    <div>
        <slot></slot>
        <div class="m-5">
            <h1 style="font-weight: normal">{{ getTitle }}</h1>
            <field-to-create
                v-show="user.permissions_id.edit_permissions"
                :text="'Sukurti naują admin paskyrą'"
                @pressed="SHOW_DIALOG('add-admin')"
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
import { LoginMixin } from './mixins/LoginMixin'
export default {
    components: {
        FieldToCreate,
    },
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await this.FETCH_ADMINS()
        })
    },
    mixins: [LoginMixin],
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
            'SHOW_DIALOG',
            'FETCH_ADMINS',
            'FETCH_ADMIN',
            'SET_WHAT_DO_ADMIN',
            'SHOW_MESSAGE',
            'DELETE_ADMIN',
            'REMOVE_ADMIN_STATE',
        ]),
        async deleting(id) {
            this.tryCatchForAPIAction(async () => {
                await this.FETCH_ADMIN(id)
                this.SHOW_MESSAGE({
                    title: 'Ar tikrai norite ištrinti adminą?',
                    content: `Admino vardas: ${this.admin.name}`,
                    action: async () => {
                        await this.DELETE_ADMIN()
                        await this.FETCH_ADMINS()
                    },
                    cancelAction: () => {
                        this.REMOVE_ADMIN_STATE()
                    },
                })
            })
        },
        async change(id, action) {
            this.tryCatchForAPIAction(async () => {
                await this.FETCH_ADMIN(id)
                action || (await this.$store.commit('SET_ADMIN_ROLE'))
                this.SET_WHAT_DO_ADMIN(action)
                this.SHOW_DIALOG('add-admin')
            })
        },
    },
}
</script>
