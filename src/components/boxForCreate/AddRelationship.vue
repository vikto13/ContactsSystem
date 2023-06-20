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
                :disabled="Boolean(company.id.length)"
            >
                <option :value="''" disabled>Pasirinkite tipą</option>
                <option
                    v-for="(component, index) in relationList"
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
                v-model="getInputName"
                type="text"
                class="form-control table-footer"
                :placeholder="`Įveskite ${
                    navBar[company.collectionName].whose
                } pavadinimą`"
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
            :is-not-valid="messageIsSubmitted && !company.relation.length"
            class="mb-2"
        >
            <md-field>
                <label>
                    Pasirinkite
                    {{ getInputNameText }}</label
                >
                <md-select v-model="company.relation" multiple>
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
            {{ company.id.length ? 'Pakeisti' : 'Pridėti' }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { LoginMixin } from '../../views/mixins/LoginMixin'
import InputBoxIcon from '../utils/InputBoxIcon.vue'
export default {
    components: {
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await this.FETCH_ALL_COMPANIES()
        })
    },
    computed: {
        ...mapGetters([
            'companyDetails',
            'company',
            'navBar',
            'messageIsSubmitted',
        ]),
        relationList() {
            return [
                this.companyDetails.departments,
                this.companyDetails.divisions,
                this.companyDetails.groups,
            ]
        },
        getInputNameText() {
            let text = this.company.id.length ? 'title' : 'what'
            return this.navBar[
                this.companyDetails[this.company.collectionName].relationship
            ][text]
        },
        getInputName: {
            get() {
                return this.company.id.length
                    ? this.company.name.name
                    : this.company.name
            },
            set(name) {
                this.$store.state.Company.company.name = this.company.id.length
                    ? {
                          ...this.company.name,
                          name,
                      }
                    : name
            },
        },
    },
    methods: {
        ...mapActions([
            'DISMISS_DIALOG',
            'FETCH_COMPANIES_RELATION',
            'POST_COMPANY_RELATION',
            'FETCH_ALL_COMPANIES',
            'SUBMIT_MESSAGE',
            'EDIT_COMPANY_RELATION',
        ]),
        async add() {
            this.tryCatchForAPIAction(async () => {
                if (
                    !(
                        this.company.collectionName &&
                        this.company.name &&
                        this.company.relation.length
                    )
                ) {
                    await this.SUBMIT_MESSAGE()
                    return
                }

                this.company.id.length
                    ? await this.EDIT_COMPANY_RELATION()
                    : await this.POST_COMPANY_RELATION()

                this.FETCH_COMPANIES_RELATION(this.relationList)
                await this.DISMISS_DIALOG()
            })
        },
        editType(e) {
            this.$store.commit('SET_COMPANY', {
                ...this.company,
                collectionName: e.target.value,
                relation: [],
            })
        },
    },
    destroyed() {
        this.$store.commit('REMOVE_COMPANY')
        this.$store.commit('SET_TO_SUBMIT_MESSAGE')
    },
}
</script>
