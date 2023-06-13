<template>
    <div class="m-3 mt-5" style="width: 30rem">
        <input-box-icon
            :title="`${navBar[$route.params.id].whose} pavadinimas:`"
            :bottom-text="'Įveskite pavadinimą'"
            :is-not-valid="isInvalid(company.name)"
        >
            <input
                v-model="company.name"
                type="text"
                class="form-control table-footer"
                :class="{ 'is-invalid': isInvalid(company.name) }"
                :placeholder="`Įveskite ${navBar[
                    $route.params.id
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
            return this.company.id
                ? `Redaguoti ${
                      this.companyDetails[this.$route.params.id].what
                  }: `
                : `Pridėti naują ${
                      this.companyDetails[this.$route.params.id].what
                  }:`
        },
        buttonTitle() {
            return this.company.id ? 'Redaguoti' : 'Pridėti'
        },
    },
    methods: {
        ...mapActions([
            'saveCompany',
            'fetchCompanies',
            'dismissDialog',
            'editCompany',
            'setToSubmit',
        ]),
        async save() {
            this.tryCatchForAPIAction(async () => {
                if (!this.company.name) {
                    await this.setToSubmit()
                    return
                }
                this.company.id
                    ? await this.editCompany(this.$route.params.id)
                    : await this.saveCompany(this.$route.params.id)
                await this.fetchCompanies(this.$route.params.id)
                this.dismissDialog()
            })
        },
    },
    destroyed() {
        this.$store.commit('clearCompanyData')
        this.$store.commit('submitMessage', false)
    },
}
</script>
