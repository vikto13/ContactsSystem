<template>
    <div class="darkBlue h-100 w-100 position-fixed">
        <div class="md-layout md-gutter md-alignment-center h-100">
            <divide-components
                :size-xs="90"
                :size-s="65"
                :size-m="50"
                :size-l="35"
                :size-xl="20"
            >
                <form class="card px-4 pt-5" v-on:submit.prevent>
                    <h1 class="mb-4">Pakeisti slaptažodį</h1>
                    <div class="forms-inputs">
                        <span> Naujas slaptažodis: </span>
                        <input-box-icon
                            :icon-name="'lock'"
                            :bottom-text="passwordMessage(user.password)"
                            :is-not-valid="
                                isInvalid({ password: user.password })
                            "
                        >
                            <input
                                v-model="user.password"
                                type="password"
                                class="form-control table-footer"
                                :class="{
                                    'is-invalid': isInvalid({
                                        password: user.password,
                                    }),
                                }"
                                placeholder="Įveskite naują slaptažodį..."
                                autocomplete="password"
                            />
                        </input-box-icon>
                    </div>
                    <div class="forms-inputs mb-4">
                        <span>Pakartoti naują slaptažodį: </span>
                        <input-box-icon
                            :icon-name="'lock'"
                            :bottom-text="
                                messageById({
                                    second_password: user.passwordConfirm,
                                })
                            "
                            :is-not-valid="
                                showCompareMessage(
                                    user.passwordConfirm,
                                    user.password
                                )
                            "
                        >
                            <input
                                v-model="user.passwordConfirm"
                                type="password"
                                class="form-control table-footer"
                                :class="{
                                    'is-invalid': showCompareMessage(
                                        user.password,
                                        user.passwordConfirm
                                    ),
                                }"
                                placeholder="Pakartoti naują slaptažodį..."
                                autocomplete="new-password"
                            />
                        </input-box-icon>
                    </div>
                    <div class="mb-3">
                        <button class="btn w-100" @click="change">
                            Keisti
                        </button>
                    </div>
                </form>
            </divide-components>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { LoginMixin } from '../views/mixins/LoginMixin'
import DivideComponents from './utils/DivideComponents.vue'
export default {
    mixins: [LoginMixin],
    components: {
        DivideComponents,
    },
    props: {
        token: {
            type: String,
        },
    },
    methods: {
        ...mapActions(['changePassword', 'alert', 'setToSubmit']),
        async change() {
            await this.setToSubmit()

            if (
                this.user.passwordConfirm !== this.user.password ||
                this.isInvalid({ password: this.user.password })
            ) {
                return
            }
            this.tryCatchForAPIAction(async () => {
                await this.changePassword({
                    token: this.token,
                })
            })
        },
    },
}
</script>
