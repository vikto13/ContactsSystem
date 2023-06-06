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

        <md-button class="btn w-100 m-0" @click="add">
            {{ office.id != null ? 'Pakeisti' : 'Pridėti' }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InputBoxIcon from './InputBoxIcon.vue'
import { LoginMixin } from '../views/mixins/LoginMixin'
export default {
    components: {
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['office']),
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
            'saveOffice',
            'dismissDialog',
            'fetchOffices',
            'editOffice',
            'setToSubmit',
        ]),
        async add() {
            if (
                this.inputs
                    .map(({ id }) => this.office[id])
                    .some((item) => item == null || item == '')
            ) {
                await this.setToSubmit()
                return
            }
            this.tryCatchForAPIAction(async () => {
                this.office.id
                    ? await this.editOffice()
                    : await this.saveOffice()
                await this.fetchOffices()
                this.dismissDialog()
            })
        },
    },
    destroyed() {
        this.$store.commit('clearOfficeState')
        this.$store.commit('submitMessage')
    },
}
</script>
<style>
.md-list-item-text {
    padding-left: 10%;
    padding-top: 3%;
}
</style>
