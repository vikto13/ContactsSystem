<template>
    <div class="md-layout-item m-3">
        <h5 class="mt-5 text-center" style="width: 32rem">
            {{
                `${
                    office.id != null
                        ? 'Pakeisti ofiso duomenis'
                        : 'Pridėti ofisą'
                }`
            }}
        </h5>
        <input-box-icon
            v-for="(input, index) in inputs"
            :key="index"
            :title="`${input.title}: `"
            class="mb-3"
            :bottom-text="messageById({ [input.id]: office[inputs[index].id] })"
            :is-not-valid="isInvalid({ [input.id]: office[inputs[index].id] })"
        >
            <input
                v-model="office[inputs[index].id]"
                type="text"
                class="form-control table-footer"
                :placeholder="input.placeholder"
                :class="{
                    'is-invalid': isInvalid({
                        [input.id]: office[inputs[index].id],
                    }),
                }"
            />
        </input-box-icon>
        <input-box-icon
            :title="`Kompanija:`"
            :bottom-text="'Pasirinkite kompaniją'"
            class="mb-2"
            ><md-field>
                <label> Pasirinkite kompaniją</label>
                <md-select v-model="office.company" multiple>
                    <md-option
                        v-for="(component, index) in selectCompanies"
                        :key="index"
                        :value="component.id"
                        selected
                    >
                        {{ component.name }}</md-option
                    >
                </md-select>
            </md-field>
        </input-box-icon>

        <md-button class="btn w-100 mt-3" @click.native="add">
            {{ office.id != null ? 'Pakeisti' : 'Pridėti' }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InputBoxIcon from '../utils/InputBoxIcon.vue'
import { LoginMixin } from '../../views/mixins/LoginMixin'
export default {
    components: {
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['office', 'companyDetails']),
        selectCompanies() {
            return this.companyDetails.companies.all
        },
    },
    data() {
        return {
            inputs: [
                {
                    id: 'street',
                    title: 'Gatvė',
                    placeholder: 'Įveskite gatvę...',
                },
                {
                    id: 'street_number',
                    title: 'Gatvės numeris',
                    placeholder: 'Įveskite gatvės numerį...',
                },
                {
                    id: 'city',
                    title: 'Miestas',
                    placeholder: 'Įveskite miestą...',
                },
                {
                    id: 'country',
                    title: 'Šalis',
                    placeholder: 'Įveskite šalį...',
                },
            ],
        }
    },
    methods: {
        ...mapActions([
            'POST_OFFICE',
            'DISMISS_DIALOG',
            'FETCH_OFFICES',
            'EDIT_OFFICE',
            'SUBMIT_MESSAGE',
        ]),
        async add() {
            await this.SUBMIT_MESSAGE()
            if (
                this.inputs
                    .map(({ id }) => this.office[id])
                    .some((item) => item == null || item == '') ||
                this.isInvalid({
                    street_number: this.office.street_number,
                })
            ) {
                return
            }
            this.tryCatchForAPIAction(async () => {
                this.office.id
                    ? await this.EDIT_OFFICE()
                    : await this.POST_OFFICE()
                await this.FETCH_OFFICES()
                this.DISMISS_DIALOG()
            })
        },
    },
    destroyed() {
        this.$store.commit('REMOVE_OFFICE')
        this.$store.commit('SET_TO_SUBMIT_MESSAGE')
    },
}
</script>
<style>
.md-list-item-text {
    padding-left: 10%;
    padding-top: 3%;
}
</style>
