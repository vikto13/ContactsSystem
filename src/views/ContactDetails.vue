<template>
    <div class="container pt-5">
        <navigator-back :go-back-path="'/'"></navigator-back>
        <h1 style="font-weight: normal">Detalesnė kontakto informacija:</h1>
        <md-card-header>
            <md-avatar>
                <svg
                    class="h-12 w-12 text-brown-300"
                    viewBox="0 0 24 24"
                    fill="#F1F2F4"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clip-rule="evenodd"
                    />
                </svg>
            </md-avatar>
            <md-card-header-text>
                <div class="md-title">
                    {{ `${employee.name} ${isNoText(employee.surname)}` }}
                </div>
                <div class="md-subhead">
                    {{ `Pozicija: ${isNoText(employee.position)}` }}
                </div>
            </md-card-header-text>
        </md-card-header>

        <md-card>
            <div class="md-layout">
                <div
                    v-for="(box, index) in info"
                    :key="index"
                    class="md-layout-item"
                >
                    <md-card-header-text
                        class="mt-3 text-center font-large"
                        style="font-size: large"
                    >
                        {{ box.title }}
                    </md-card-header-text>
                    <md-card-content>
                        <p
                            v-for="(column, position) in box.details"
                            :key="position"
                        >
                            {{
                                `${column.field} ${isNoText(
                                    column.getText(employee)
                                )}`
                            }}
                        </p>
                    </md-card-content>
                </div>
            </div>
        </md-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavigatorBack from '../components/NavigatorBack.vue'
export default {
    components: {
        NavigatorBack,
    },
    props: {
        id: {
            type: String,
        },
    },
    computed: {
        ...mapGetters(['employee']),
    },
    data() {
        return {
            info: [
                {
                    title: 'Kontaktinės detalės:',
                    details: [
                        {
                            getText: (text) => text.phone_number,
                            field: 'Telefono nr:',
                        },
                        { getText: (text) => text.email, field: 'El paštas:' },
                        {
                            getText: (text) => text.office_id.name,
                            field: 'Adresas:',
                        },
                        {
                            getText: (text) => text.position,
                            field: 'Pozicija:',
                        },
                    ],
                },
                {
                    title: 'Kompanijos detalės:',
                    details: [
                        {
                            getText: (text) => text.company_id.name,
                            field: 'Kompanija:',
                        },
                        {
                            getText: (text) => text.office_id.name,
                            field: 'Ofisas:',
                        },
                        {
                            getText: (text) => text.department_id.name,
                            field: 'Departamentas:',
                        },
                        {
                            getText: (text) => text.group_id.name,
                            field: 'Grupė:',
                        },
                    ],
                },
            ],
        }
    },
    destroyed() {
        this.$store.commit('clearEmployee')
    },
    methods: {
        isNoText(text) {
            return text ? text : '-'
        },
    },
}
</script>
