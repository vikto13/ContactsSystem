<template>
    <div v-if="!isSended">
        <h1>Priminti slaptažodį</h1>
        <alert-message></alert-message>
        <div class="forms-inputs mb-4">
            <input-box-icon
                :icon-name="'mail'"
                :title="'Elektroninis paštas:'"
                :bottom-text="messageById({ email: user.email })"
                :is-not-valid="isInvalid(user.email)"
            >
                <input
                    v-model="user.email"
                    type="text"
                    class="form-control table-footer"
                    :class="{ 'is-invalid': isInvalid(user.email) }"
                    placeholder="Įveskite el pašto adresą..."
                />
            </input-box-icon>
        </div>
        <div class="mb-3">
            <button class="btn w-100" @click="() => send()">Pateikti</button>
        </div>
    </div>
    <div v-else>
        <h1>Žinutė išsiųsta</h1>
        <p>Patikrinkite elektroninį paštą</p>
    </div>
</template>
<script>
import { LoginMixin } from '../views/mixins/LoginMixin'
import { mapActions } from 'vuex'
import AlertMessage from './fields/AlertMessage.vue'

export default {
    mixins: [LoginMixin],
    components: {
        AlertMessage,
    },
    data() {
        return {
            isSended: false,
        }
    },
    methods: {
        ...mapActions(['RESET_PASSWORD', 'SHOW_MESSAGE']),
        async send() {
            try {
                await this.RESET_PASSWORD()
                this.isSended = true
                return
            } catch {
                this.SHOW_MESSAGE({
                    title: 'Įvyko klaida',
                    content: `Pabandykite dar kartą`,
                    isAlert: true,
                })
            }
        },
    },
}
</script>
