<template>
    <div class="m-3 mt-5" style="width: 30rem">
        <input-box-icon
            :title="`${navBar['companies'].whose} pavadinimas:`"
            :bottom-text="'Įveskite pavadinimą'"
            :is-not-valid="isInvalid(company.name)"
        >
            <input
                v-model="company.name"
                type="text"
                class="form-control table-footer"
                :class="{ 'is-invalid': isInvalid(company.name) }"
                :placeholder="`Įveskite ${navBar[
                    'companies'
                ].whose.toLowerCase()} pavadinimą...`"
            />
        </input-box-icon>

        <md-button class="w-50 btn" @click="save()">
            {{ buttonTitle }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import DivideComponents from '../utils/DivideComponents.vue'
import { LoginMixin } from '../../views/mixins/LoginMixin'
import InputBoxIcon from '../utils/InputBoxIcon.vue'

export default {
    components: {
        DivideComponents,
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['company', 'companyDetails', 'navBar']),
        showTitle() {
            return this.company.id.length
                ? `Redaguoti ${this.companyDetails['companies'].what}: `
                : `Pridėti naują ${this.companyDetails['companies'].what}:`
        },
        buttonTitle() {
            return this.company.id.length ? 'Redaguoti' : 'Pridėti'
        },
    },
    methods: {
        ...mapActions([
            'POST_COMPANY',
            'FETCH_COMPANIES',
            'DISMISS_DIALOG',
            'EDIT_COMPANY',
            'SUBMIT_MESSAGE',
        ]),
        async save() {
            this.tryCatchForAPIAction(async () => {
                if (!this.company.name) {
                    await this.SUBMIT_MESSAGE()
                    return
                }
                this.company.id.length
                    ? await this.EDIT_COMPANY('companies')
                    : await this.POST_COMPANY('companies')
                await this.FETCH_COMPANIES('companies')
                this.DISMISS_DIALOG()
            })
        },
    },
    destroyed() {
        this.$store.commit('REMOVE_COMPANY')
        this.$store.commit('SET_TO_SUBMIT_MESSAGE', false)
    },
}
</script>
