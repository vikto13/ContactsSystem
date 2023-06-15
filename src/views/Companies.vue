<template>
    <div>
        <slot></slot>
        <h1 style="font-weight: normal" class="mt-5 ml-5">
            {{ navBar[id].whose }}
        </h1>
        <field-to-create
            v-show="havePermission('edit_companies')"
            :text="navBar[id].textAdd"
            @pressed="edit(null)"
            class="ml-5"
        >
        </field-to-create>

        <div class="m-5 pb-5">
            <h5 v-if="!companyDetails[id].all.length" class="mt-5 text-center">
                {{ navBar[id].textEmpty }}
            </h5>

            <div v-else>
                <divide-components
                    v-for="company in companyDetails[id].all"
                    :key="company.id"
                    :size-xl="40"
                    :size-l="50"
                    :size-s="90"
                    :size-m="60"
                >
                    <md-card
                        class="pl-5 mt-3"
                        style="height: 5rem; display: flex; align-items: center"
                    >
                        <div style="flex: 1">
                            {{ company.name }}
                        </div>
                        <div style="flex: 0.3">
                            <md-button
                                v-show="havePermission('edit_companies')"
                                md-with-hover
                                class="md-icon-button md-raised edit-btn ml-3"
                                @click="() => edit(company.id)"
                            >
                                <md-icon style="color: white">edit</md-icon>
                            </md-button>

                            <md-button
                                v-show="havePermission('delete_companies')"
                                md-with-hover
                                class="md-icon-button md-raised delete-btn ml-3"
                                @click="() => deleteIt(company.id)"
                            >
                                <md-icon style="color: white">delete</md-icon>
                            </md-button>
                        </div>
                    </md-card>
                </divide-components>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/utils/Card.vue'
import DivideComponents from '../components/utils/DivideComponents.vue'
import FieldToCreate from '../components/fields/FieldToCreate.vue'
import { LoginMixin } from './mixins/LoginMixin'

export default {
    props: {
        id: {
            type: String,
        },
    },
    components: {
        Card,
        DivideComponents,
        FieldToCreate,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['company', 'companyDetails', 'navBar']),
    },
    async mounted() {
        this.tryCatchForAPIAction(async () => {
            await Promise.all(
                [
                    this.companyDetails.companies,
                    this.companyDetails.departments,
                    this.companyDetails.divisions,
                    this.companyDetails.groups,
                ].map(({ name }) => this.fetchCompanies(name))
            )
        })
    },
    methods: {
        ...mapActions([
            'triggerDialog',
            'fetchCompanies',
            'deleteCompany',
            'triggerMessage',
            'findCompany',
            'checkIfIsRelation',
        ]),
        async edit(event) {
            this.tryCatchForAPIAction(async () => {
                event &&
                    (await this.findCompany({
                        id: event,
                        entity: this.id,
                    }))

                this.triggerDialog('add-company')
            })
        },
        async deleteIt(event) {
            await this.findCompany({
                id: event,
                entity: this.id,
            })
            await this.checkIfIsRelation({
                id: event,
                collectionName: this.id,
            })

            if (this.company.relation.length) {
                await this.triggerMessage({
                    title: `Negalite ištrinti`,
                    content:
                        `${this.navBar[this.id].title} turi ryšius: <br>` +
                        this.company.relation.join('<br>'),
                    isAlert: true,
                })
                this.$store.commit('clearCompanyData')
            } else {
                this.triggerMessage({
                    title: `Ar tikrai norite ištrinti ${
                        this.navBar[this.id].what
                    }?`,
                    content: `${this.navBar[this.id].whose} pavadinimas: ${
                        this.company.name
                    }`,
                    action: async () => {
                        await this.deleteCompany()
                        this.$store.commit('clearCompanyData')
                        await this.fetchCompanies(this.id)
                    },
                    cancelAction: () => {},
                })
            }
        },
    },
}
</script>

<style scoped>
.nav-pills .nav-link.active {
    background-color: #1f3f77;
}
</style>
