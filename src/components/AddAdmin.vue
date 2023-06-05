<template>
    <div>
        <div class="md-layout">
            <div v-show="admin.whatDo != 0" class="md-layout-item m-2">
                <h3 class="mb-3 mt-3">{{ title[admin.whatDo] }}:</h3>
                <input-box-icon
                    :title="'Vardas:'"
                    :bottom-text="'Įveskite vardą'"
                    :is-not-valid="isInvalid(admin.name)"
                >
                    <input
                        v-model="admin.name"
                        type="text"
                        class="form-control table-footer"
                        :class="{ 'is-invalid': isInvalid(admin.name) }"
                        :placeholder="'Įveskite vardą...'"
                    />
                </input-box-icon>
                <input-box-icon
                    :icon-name="'mail'"
                    :bottom-text="emailMessage(admin.email)"
                    :title="'Elektroninis paštas:'"
                    :is-not-valid="
                        isInvalid({
                            email: admin.email,
                        })
                    "
                >
                    <input
                        v-model="admin.email"
                        type="text"
                        :class="{ 'is-invalid': showEmailMessage(admin.email) }"
                        :placeholder="'Įveskite el.paštą...'"
                        class="form-control table-footer"
                        :style="{ 'border-left-width': 0 }"
                    />
                </input-box-icon>
                <add-image></add-image>
            </div>
            <div v-show="admin.whatDo != 1" class="md-layout-item m-3 pt-5">
                <h4>Administracinės teisės</h4>
                <md-checkbox
                    v-for="item in Object.keys(adminRoles)"
                    :key="item"
                    v-model="admin.roles"
                    :value="item"
                    class="md-primary d-flex"
                    >{{ adminRoles[item] }}</md-checkbox
                >
            </div>
        </div>
        <md-button class="btn m-0 mt-1 pl-2 text-start w-100" @click="save">
            {{ button[admin.whatDo] }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AddImage from './AddImage.vue'
import InputBoxIcon from './InputBoxIcon.vue'
import { LoginMixin } from '../views/mixins/LoginMixin'
export default {
    components: {
        InputBoxIcon,
        AddImage,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['adminRoles', 'admin', 'admins']),
    },
    async mounted() {
        this.admin.whatDo == null && this.clearAdminData()
        await this.fetchRoles()
    },
    data() {
        return {
            title: {
                null: 'Pridėti naują admin paskyrą',
                0: 'Keisti leidimus',
                1: 'Redaguoti',
            },
            button: {
                null: 'Pridėti',
                0: 'Keisti',
                1: 'Redaguoti',
            },
        }
    },
    methods: {
        ...mapActions([
            'fetchRoles',
            'saveAdmin',
            'dismissDialog',
            'fetchAdmins',
            'clearAdminData',
            'updateAdmin',
            'triggerMessage',
            'updateRoles',
            'setToSubmit',
        ]),
        async save() {
            if (this.admin.whatDo === 0) {
                await this.updateRoles()
                this.dismissDialog()
            } else {
                await this.setToSubmit()
                if (
                    !(
                        this.admin.name &&
                        !this.isInvalid({ email: this.admin.email })
                    )
                ) {
                    return
                }

                this.tryCatchForAPIAction(async () => {
                    if (this.admin.whatDo != null) {
                        await this.updateAdmin()
                        this.dismissDialog()
                    } else {
                        await this.saveAdmin()

                        this.dismissDialog()
                        this.triggerMessage({
                            title: 'Admin paskyra sukurta sėkmingai',
                            content: `Elektroninis paštas: ${this.admin.email} ir slaptažodis: ${this.admin.password}`,
                            isAlert: true,
                        })
                    }
                    await this.fetchAdmins()
                })
            }
        },
    },
    destroyed() {
        this.clearAdminData()
        this.$store.commit('submitMessage')
    },
}
</script>

<style>
.md-checkbox {
    margin: 3% 0 0 0 !important;
}

.md-checked .md-checkbox-container {
    background-color: black;
}
</style>
