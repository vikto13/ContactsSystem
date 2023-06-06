<template>
    <div class="md-layout-item m-3">
        <h5 class="text-center mb-4" style="margin-top: 13%">
            Kompanijos detalės:
        </h5>
        <div
            v-for="(select, position) in [
                { ...companyDetails.companies, required: true },
                { ...companyDetails.departments, required: false },
                { ...companyDetails.divisions, required: true },
                { ...companyDetails.groups, required: false },
                { ...companyDetails.offices, required: true },
            ]"
            :key="position"
        >
            <input-box-icon
                :bottom-text="`Pasirinkite ${navBar[select.name].what}:`"
                :title="`${navBar[select.name].title}:`"
                :is-not-valid="
                    isInvalid({ [select.id]: employee[select.id] }) &&
                    select.required
                "
                class="mt-2"
            >
                <select
                    v-model="employee[select.id]"
                    class="form-select"
                    @input="
                        $store.commit('setEmployee', {
                            [select.id]: $event.target.value,
                        })
                    "
                >
                    <option
                        selected
                        :value="''"
                        :disabled="employee[select.id] == ''"
                    >
                        Pasirinkite {{ navBar[select.name].what }}
                    </option>
                    <option
                        v-for="option in select.all"
                        :key="option.id"
                        :value="option.id"
                        :disabled="employee[select.id] == option.id"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </input-box-icon>
        </div>
        <add-image></add-image>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AddImage from './AddImage.vue'
import InputBoxIcon from './InputBoxIcon.vue'
import { LoginMixin } from '../views/mixins/LoginMixin'
export default {
    components: {
        AddImage,
        InputBoxIcon,
    },
    mixins: [LoginMixin],
    computed: {
        ...mapGetters(['companyDetails', 'employee', 'navBar']),
    },
}
</script>
