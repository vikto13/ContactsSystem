<template>
    <div class="container pt-5">
        <navigator-back :go-back-path="'/'"></navigator-back>
        <h1 style="font-weight: normal">Detalesnė kontakto informacija:</h1>
        <md-card-header>
            <avatar :imageUrl="getImage"></avatar>
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
                            {{ column.field }}
                            <span
                                :style="{
                                    color: column.color ? 'black' : '#0054A6',
                                }"
                            >
                                {{ isNoText(column.getText(employee)) }}
                            </span>
                        </p>
                    </md-card-content>
                </div>
            </div>
        </md-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavigatorBack from '../components/utils/NavigatorBack.vue'
import Avatar from '../components/utils/Avatar.vue'
export default {
    components: {
        NavigatorBack,
        Avatar,
    },
    props: {
        id: {
            type: String,
        },
    },
    computed: {
        ...mapGetters(['employee']),
        getImage() {
            return this.employee.photo
                ? `${
                      import.meta.env.VITE_POCKET_BASE_URL
                  }/api/files/b2oym7fr4tkhpsr/${this.employee.id}/${
                      this.employee.photo
                  }`
                : ''
        },
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
                            color: true,
                        },
                        {
                            getText: (text) => text.office_id.name,
                            field: 'Ofisas:',
                            color: true,
                        },
                        {
                            getText: (text) => text.department_id.name,
                            field: 'Departamentas:',
                        },
                        {
                            getText: (text) => text.division_id.name,
                            field: 'Divizija:',
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
        this.$store.commit('REMOVE_EMPLOYEE')
    },
    methods: {
        isNoText(text) {
            return text ? text : '-'
        },
    },
}
</script>
