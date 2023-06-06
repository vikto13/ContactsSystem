<template>
    <div>
        <slot></slot>
        <div style="margin: 2%">
            <h1>{{ navBar.contacts.systemText }}</h1>
            <div class="row">
                <div class="col-md-6 col-lg-5 col-xl-4">
                    <input-box-icon>
                        <input
                            v-model="contactSearch"
                            type="text"
                            class="form-control"
                            placeholder="Ieškoti kontakto"
                            style="background-color: #f1f2f4"
                            v-debounce:1500="searching"
                        />
                    </input-box-icon>
                </div>
                <div class="col-4 col-md-1 align-self-center margin d-flex">
                    <md-menu
                        md-size="medium"
                        md-align-trigger
                        class="d-flex flex-wrap"
                    >
                        <md-button
                            class="md-icon-button md-raised ml-3 edit-btn"
                            md-menu-trigger
                        >
                            <md-icon style="color: white">filter_alt</md-icon>
                        </md-button>
                        <md-menu-content>
                            <md-menu-item
                                v-for="(option, index) in optionsForPaginate"
                                :disabled="sizeOfPaginate == option"
                                :key="index"
                                @click="() => setPaginate(option)"
                                >{{ option }}</md-menu-item
                            >
                            <md-menu-item
                                :value="employees.length"
                                :disabled="sizeOfPaginate == employees.length"
                                @click="() => setPaginate(employees.length)"
                                >visi</md-menu-item
                            >
                        </md-menu-content>
                    </md-menu>

                    <div class="d-flex flex-wrap">
                        <md-button
                            class="md-icon-button md-raised ml-3 edit-btn"
                            @click="() => (isSelected = buttons[isSelected])"
                        >
                            <md-icon style="color: #ffffff">{{
                                isSelected
                            }}</md-icon>
                        </md-button>
                    </div>

                    <div class="d-flex flex-wrap">
                        <md-button
                            v-show="havePermission('edit_companies')"
                            class="md-icon-button md-raised ml-3 edit-btn"
                            @click="() => triggerDialog('add-contacts')"
                        >
                            <md-icon style="color: #ffffff">add</md-icon>
                        </md-button>
                    </div>
                </div>
            </div>
            <p style="display: inline">
                Iš viso rasta:
                <span style="font-weight: bold">{{ employees.length }}</span>
                {{ navBar.title }}
            </p>
            <filter-sections></filter-sections>
            <h5 v-if="!employees.length" class="mt-5 text-center">
                Kontaktų nerasta
            </h5>
            <component v-else :is="showComponents[isSelected]"></component>
            <pagination></pagination>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ContactCards from '../components/ContactCards.vue'
import Pagination from '../components/Pagination.vue'
import InputBoxIcon from '../components/InputBoxIcon.vue'
import FilterSections from '../components/FilterSections.vue'
import ContactTables from '../components/ContactTables.vue'
import { LoginMixin } from './mixins/LoginMixin'

export default {
    components: {
        ContactCards,
        Pagination,
        InputBoxIcon,
        ContactTables,
        FilterSections,
    },
    async mounted() {
        await this.fetchEmployees()
    },
    mixins: [LoginMixin],
    data() {
        return {
            showComponents: {
                table_rows: 'contact-cards',
                grid_view: 'contact-tables',
            },
            isSelected: 'table_rows',
            buttons: {
                table_rows: 'grid_view',
                grid_view: 'table_rows',
            },
        }
    },
    computed: {
        ...mapGetters([
            'employees',
            'navBar',
            'optionsForPaginate',
            'sizeOfPaginate',
        ]),
        contactSearch: {
            get() {
                return this.$store.state.Employee.contactSearch
            },
            set(text) {
                this.$store.state.Employee.contactSearch = text
            },
        },
    },
    methods: {
        ...mapActions([
            'fetchEmployees',
            'triggerDialog',
            'searchContactBySelections',
            'searchContactByText',
        ]),
        async searching() {
            await this.searchContactBySelections()
            await this.searchContactByText()
        },
        setPaginate(size) {
            this.$store.commit('setPagine', size)
        },
    },
}
</script>
<style scoped>
@media (max-width: 767px) {
    .margin {
        margin: 10px 0 15px 0;
    }
}
</style>
