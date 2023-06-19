<template>
    <div class="md-layout-item m-2">
        <h3 class="mb-5 mt-3">
            {{ employee.id ? 'Pakeisti kontaktą' : 'Pridėti naują kontaktą:' }}
        </h3>
        <div v-for="(table, index) in inputs" :key="index">
            <h5 v-if="table.name" class="mt-5">{{ table.name }}</h5>
            <input-box-icon
                v-for="(column, index) in table.boxs"
                :key="index"
                :icon-name="column.icon"
                :bottom-text="
                    messageById({
                        [column.input]: employee[column.input],
                    })
                "
                :title="`${column.title}:`"
                :is-not-valid="
                    isInvalid({ [column.input]: employee[column.input] })
                "
            >
                <input
                    v-model="employee[column.input]"
                    type="text"
                    class="form-control"
                    :placeholder="column.placeholder"
                    :class="{
                        'is-invalid': isInvalid({
                            [column.input]: employee[column.input],
                        }),
                    }"
                    style="background-color: #f1f2f4"
                    :style="{ 'border-left-width': column.icon ? 0 : null }"
                    @input="
                        $store.commit('SET_EMPLOYEE', {
                            [column.input]: $event.target.value,
                        })
                    "
                />
            </input-box-icon>
        </div>
        <md-button class="btn w-100 m-0 mt-4" @click="save">
            {{ employee.id ? 'Pakeisti' : 'Pridėti' }}
        </md-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AddImage from './fields/AddImage.vue'
import InputBoxIcon from './utils/InputBoxIcon.vue'
import { LoginMixin } from '../views/mixins/LoginMixin'

export default {
    components: {
        InputBoxIcon,
        AddImage,
    },
    computed: {
        ...mapGetters(['employee', 'companyDetails']),
    },
    mixins: [LoginMixin],
    data() {
        return {
            inputs: [
                {
                    name: '',
                    boxs: [
                        {
                            title: 'Vardas',
                            placeholder: 'Įveskite vardą...',
                            input: 'name',
                        },
                        {
                            title: 'Pavardė',
                            placeholder: 'Įveskite pavardę...',
                            input: 'surname',
                        },
                        {
                            title: 'Pozicija',
                            placeholder: 'Įveskite poziciją...',
                            input: 'position',
                        },
                    ],
                },
                {
                    name: 'Kontaktinė informacija',
                    boxs: [
                        {
                            title: 'Elektroninis paštas',
                            placeholder: 'Įveskite el.paštą...',
                            icon: 'mail',
                            input: 'email',
                        },
                        {
                            title: 'Telefono numeris',
                            placeholder: 'Įveskite telefono numerį...',
                            icon: 'phone',
                            input: 'phone_number',
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        ...mapActions([
            'POST_EMPLOYEE',
            'EDIT_EMPLOYEE',
            'DISMISS_DIALOG',
            'FETCH_EMPLOYEES',
            'SUBMIT_MESSAGE',
            'GET_OFFICE_BY_RELATION',
        ]),
        async save() {
            await this.SUBMIT_MESSAGE()
            await this.GET_OFFICE_BY_RELATION()
            if (
                ![
                    this.companyDetails.companies.id,
                    this.companyDetails.divisions.id,
                    this.companyDetails.offices.id,
                    'name',
                    'surname',
                    'position',
                    'email',
                    'phone_number',
                ]
                    .map((value) =>
                        this.isInvalid({
                            [value]: this.employee[value],
                        })
                    )
                    .every((value) => value === false)
            ) {
                return
            }
            this.tryCatchForAPIAction(async () => {
                if (this.employee.id) {
                    await this.EDIT_EMPLOYEE()
                } else {
                    await this.POST_EMPLOYEE()
                }
                await this.DISMISS_DIALOG()
                await this.FETCH_EMPLOYEES()
            })
        },
    },
}
</script>
