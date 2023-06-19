<template>
    <div>
        <slot></slot>
        <h1 style="font-weight: normal" class="mt-5 ml-5">
            {{ navBar['companies'].whose }}
        </h1>
        <field-to-create
            v-show="havePermission('edit_companies')"
            :text="navBar['companies'].textAdd"
            @pressed="edit(null)"
            class="ml-5"
        >
        </field-to-create>

        <div class="m-5 pb-5">
            <h5
                v-if="!companyDetails['companies'].all.length"
                class="mt-5 text-center"
            >
                {{ navBar['companies'].textEmpty }}
            </h5>

            <div v-else>
                <divide-components
                    v-for="company in companyDetails['companies'].all"
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
                ].map(({ name }) => this.FETCH_COMPANIES(name))
            )
        })
    },
    methods: {
        ...mapActions([
            'SHOW_DIALOG',
            'FETCH_COMPANIES',
            'DELETE_COMPANY',
            'SHOW_MESSAGE',
            'FIND_COMPANY',
            'CHECK_IF_IS_RELATION',
        ]),
        async edit(event) {
            this.tryCatchForAPIAction(async () => {
                event &&
                    (await this.FIND_COMPANY({
                        id: event,
                        entity: 'companies',
                    }))

                this.SHOW_DIALOG('add-company')
            })
        },
        async deleteIt(event) {
            this.tryCatchForAPIAction(async () => {
                await this.FIND_COMPANY({
                    id: event,
                    entity: 'companies',
                })
                await this.CHECK_IF_IS_RELATION({
                    id: event,
                    collectionName: 'companies',
                })

                if (this.company.relation.length) {
                    await this.SHOW_MESSAGE({
                        title: `Negalite ištrinti`,
                        content:
                            `${this.navBar['companies'].title} turi ryšius: <br>` +
                            this.company.relation.join('<br>'),
                        isAlert: true,
                    })
                    this.$store.commit('REMOVE_COMPANY')
                } else {
                    this.SHOW_MESSAGE({
                        title: `Ar tikrai norite ištrinti ${this.navBar['companies'].what}?`,
                        content: `${this.navBar['companies'].whose} pavadinimas: ${this.company.name}`,
                        action: async () => {
                            await this.DELETE_COMPANY()
                            this.$store.commit('REMOVE_COMPANY')
                            await this.FETCH_COMPANIES('companies')
                        },
                        cancelAction: () => {},
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.nav-pills .nav-link.active {
    background-color: #1f3f77;
}
</style>
