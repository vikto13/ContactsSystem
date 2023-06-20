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
import AddImage from '../fields/AddImage.vue'
import InputBoxIcon from '../utils/InputBoxIcon.vue'
import { LoginMixin } from '../../views/mixins/LoginMixin'
import { getFromObjectText } from '../../store/storeSlices/filterAction'
export default {
    components: {
        InputBoxIcon,
        AddImage,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['adminRoles', 'admin', 'admins', 'image']),
    },
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            this.admin.whatDo == null && this.REMOVE_ADMIN_STATE()
            await this.FETCH_ROLES()
        })
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
            'FETCH_ROLES',
            'POST_ADMIN',
            'DISMISS_DIALOG',
            'FETCH_ADMINS',
            'REMOVE_ADMIN_STATE',
            'UPDATE_ADMIN',
            'SHOW_MESSAGE',
            'UPDATE_ADMIN',
            'SUBMIT_MESSAGE',
            'AUTH_WITH_TOKEN',
        ]),
        async save() {
            if (this.admin.whatDo === 0) {
                this.tryCatchForAPIAction(async () => {
                    await this.UPDATE_ADMIN()
                    await this.AUTH_WITH_TOKEN()
                    return this.DISMISS_DIALOG()
                })
            } else {
                await this.SUBMIT_MESSAGE()
                if (
                    !(
                        this.admin.name &&
                        !this.isInvalid({ email: this.admin.email })
                    )
                ) {
                    return
                }

                try {
                    if (this.admin.whatDo != null) {
                        await this.UPDATE_ADMIN()
                        await this.DISMISS_DIALOG()
                    } else {
                        await this.POST_ADMIN()

                        this.DISMISS_DIALOG()
                        this.SHOW_MESSAGE({
                            title: 'Admin paskyra sukurta sėkmingai',
                            content: `Elektroninis paštas: ${this.admin.email} ir slaptažodis: ${this.admin.password}`,
                            isAlert: true,
                        })
                    }
                    await this.AUTH_WITH_TOKEN()
                    await this.FETCH_ADMINS()
                } catch (err) {
                    this.SHOW_MESSAGE({
                        title: 'Negalima sukurti',
                        content: `${getFromObjectText(
                            err.response.data.data,
                            'message'
                        )}`,
                        isAlert: true,
                    })
                }
            }
        },
    },
    destroyed() {
        this.REMOVE_ADMIN_STATE()
        this.$store.commit('SET_TO_SUBMIT_MESSAGE')
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
