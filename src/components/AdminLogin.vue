<template>
    <form v-on:submit.prevent>
        <h1>Admin prisijungimas</h1>
        <alert-message></alert-message>
        <div class="forms-inputs">
            <input-box-icon
                :icon-name="'mail'"
                :title="'Elektroninis paštas:'"
                :bottom-text="messageById({ email: user.email })"
                :is-not-valid="isInvalid(user.email)"
            >
                <input
                    v-model="user.email"
                    type="text"
                    class="form-control table-footer border-left-0"
                    :class="{ 'is-invalid': isInvalid(user.email) }"
                    placeholder="Įveskite el pašto adresą..."
                    autocomplete="username"
                />
            </input-box-icon>
        </div>
        <div class="forms-inputs mb-4">
            <input-box-icon
                :icon-name="'lock'"
                :title="'Slaptažodis:'"
                :bottom-text="messageById({ password: user.password })"
                :is-not-valid="isInvalid(user.password)"
            >
                <input
                    v-model="user.password"
                    type="password"
                    :class="{ 'is-invalid': isInvalid(user.password) }"
                    class="form-control table-footer border-left-0"
                    placeholder="Įveskite slaptažodį..."
                    autocomplete="current-password"
                />
            </input-box-icon>
        </div>
        <div style="padding-bottom: 1rem">
            Pamiršote slaptažodį?
            <a href="#/admin/auth-refresh"> Pakeisti slaptažodį </a>
        </div>
        <div class="mb-3">
            <button class="btn w-100" @click.stop="() => login()">
                Prisijungti
            </button>
        </div>
    </form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { LoginMixin } from '../views/mixins/LoginMixin'
import AlertMessage from './fields/AlertMessage.vue'

export default {
    components: {
        AlertMessage,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['alert']),
    },
    methods: {
        ...mapActions([
            'AUTH_WITH_PASSWORD',
            'DISABLE_ALERT',
            'SUBMIT_MESSAGE',
        ]),
        async login() {
            if (!(this.user.password && this.user.email)) {
                this.tryCatchForAPIAction(async () => {
                    await this.SUBMIT_MESSAGE()
                })
                return
            }
            try {
                await this.AUTH_WITH_PASSWORD()
                setTimeout(() => {
                    this.$router.push('/')
                    this.alert.showAlert && this.DISABLE_ALERT()
                }, 10)
            } catch (err) {
                if (err.status) {
                    this.DISABLE_ALERT(400)
                    return
                }
                this.DISABLE_ALERT(404)
            }
        },
    },
    destroyed() {
        this.$store.commit('SET_TO_SUBMIT_MESSAGE')
    },
}
</script>
