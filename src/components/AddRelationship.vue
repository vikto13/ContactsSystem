<template>
    <div class="md-layout-item m-3">
        <h5 class="mt-5 text-center">Pridėti struktūrą</h5>
        <input-box-icon
            :title="`Tipas:`"
            :bottom-text="'Pasirinkite tipą'"
            :is-not-valid="messageIsSubmitted && !company.collectionName"
            class="mb-2"
        >
            <select
                v-model="company.collectionName"
                class="form-select"
                style="width: 30rem"
                @input="editType"
                :disabled="Boolean(company.id)"
            >
                <option :value="''" disabled>Pasirinkite tipą</option>
                <option
                    v-for="(component, index) in [
                        companyDetails.groups,
                        companyDetails.departments,
                        companyDetails.divisions,
                        companyDetails.offices,
                    ]"
                    :key="index"
                    :value="component.name"
                >
                    {{ navBar[component.name].title }}
                </option>
            </select>
        </input-box-icon>
        <input-box-icon
            v-if="company.collectionName"
            :title="`Įveskite pavadinimą: `"
            class="mb-3"
            :bottom-text="`Įveskite pavadinimą`"
            :is-not-valid="messageIsSubmitted && !company.name"
        >
            <input
                v-model="company.name"
                type="text"
                class="form-control table-footer"
                :placeholder="`Įveskite ${navBar[company.collectionName].what}`"
                :class="{
                    'is-invalid': messageIsSubmitted && !company.name,
                }"
            />
        </input-box-icon>

        <input-box-icon
            v-if="company.collectionName"
            :title="`Ryšys:`"
            :bottom-text="`Pasirinkite ${
                navBar[companyDetails[company.collectionName].relationship].what
            }`"
            :is-not-valid="messageIsSubmitted && !company.relation"
            class="mb-2"
        >
            <md-field>
                <label v-if="company.id">
                    {{
                        navBar[
                            companyDetails[company.collectionName].relationship
                        ].title
                    }}</label
                >
                <label v-else>
                    Pasirinkite
                    {{
                        navBar[
                            companyDetails[company.collectionName].relationship
                        ].what
                    }}</label
                >
                <md-select
                    v-model="company.relation"
                    :disabled="Boolean(company.id)"
                    multiple
                >
                    <md-option
                        v-for="(component, index) in companyDetails[
                            companyDetails[company.collectionName].relationship
                        ].all"
                        :key="index"
                        :value="component.id"
                    >
                        {{ component.name }}</md-option
                    >
                </md-select>
            </md-field>
        </input-box-icon>

        <md-button
            :disabled="!company.collectionName"
            class="btn w-100"
            :style="{ opacity: company.collectionName ? 1 : 0.4 }"
            @click="add"
        >
            {{ company.id != null ? 'Pakeisti' : 'Pridėti' }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { LoginMixin } from '../views/mixins/LoginMixin'
import InputBoxIcon from './InputBoxIcon.vue'
export default {
    components: {
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    async mounted() {
        await this.fetchAllCompanies()
    },
    computed: {
        ...mapGetters([
            'companyDetails',
            'company',
            'navBar',
            'messageIsSubmitted',
        ]),
    },
    methods: {
        ...mapActions([
            'dismissDialog',
            'fetchAllCompaniesRelation',
            'saveCompanyRelation',
            'fetchAllCompanies',
            'setToSubmit',
            'editCompanyRelation',
        ]),
        async add() {
            this.tryCatchForAPIAction(async () => {
                if (
                    !(
                        this.company.collectionName &&
                        this.company.name &&
                        this.company.relation
                    )
                ) {
                    await this.setToSubmit()
                    return
                }
                this.company.id
                    ? await this.editCompanyRelation()
                    : await this.saveCompanyRelation()
                await this.dismissDialog()
                await this.fetchAllCompaniesRelation()
            })
        },
        editType() {
            this.company ||
                this.$store.commit('setCompany', {
                    relation: [],
                })
        },
    },
    destroyed() {
        this.$store.commit('clearCompanyData')
        this.$store.commit('submitMessage')
    },
}
</script>
