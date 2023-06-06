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
        <div class="m-5 card text-bg-light pb-5">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <li
                        v-for="(component, index) in [
                            companyDetails.companies,
                            companyDetails.groups,
                            companyDetails.departments,
                            companyDetails.divisions,
                        ]"
                        :key="index"
                        class="nav-item"
                    >
                        <a
                            class="nav-link navbar-light"
                            :href="`#/${component.name}/records`"
                            :class="
                                component.name == id ? 'active disabled' : ''
                            "
                            :style="{
                                color: component.name != id ? '#414042' : null,
                                textDecoration: 'none',
                            }"
                            >{{ navBar[component.name].title }}</a
                        >
                    </li>
                </ul>
            </div>

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
                        class="pl-5 m-2 mt-3"
                        style="height: 5rem; display: flex; align-items: center"
                    >
                        <div
                            style="
                                overflow: hidden;
                                text-overflow: ellipsis;
                                flex: 1;
                            "
                        >
                            {{ company.name }}
                        </div>
                        <div>
                            <md-button
                                v-show="havePermission('edit_companies')"
                                md-with-hover
                                class="md-icon-button md-raised edit-btn"
                                @click="() => edit(company.id)"
                            >
                                <md-icon style="color: white">edit</md-icon>
                            </md-button>

                            <md-button
                                v-show="havePermission('delete_companies')"
                                md-with-hover
                                class="md-icon-button md-raised ml-3 delete-btn"
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
import Card from '../components/Card.vue'
import DivideComponents from '../components/DivideComponents.vue'
import FieldToCreate from '../components/FieldToCreate.vue'
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
