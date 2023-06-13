<template>
    <div class="md-layout md-gutter md-alignment-center">
        <divide-components
            v-for="(contact, index) in showCards"
            :key="index"
            :size-xl="20"
            :size-l="25"
            :size-m="30"
        >
            <card
                :buttons="[
                    { name: 'edit', show: havePermission('edit_employees') },
                    {
                        name: 'delete',
                        show: havePermission('delete_employees'),
                    },
                ]"
                :title="`${contact.name} ${contact.surname}`"
                :subtitle="`Pozicija: ${contact.position} `"
                :contents="[
                    `Telefono nr:  ${contact.phone_number}`,
                    `El paštas: ${contact.email} `,
                    `Adresas: ${getAddress(contact)}`,
                ]"
                :id="contact.id"
                @buttonClicked="edit"
                @cardClicked="see"
            ></card>
        </divide-components>
    </div>
</template>
<script>
import Card from './utils/Card.vue'
import DivideComponents from './utils/DivideComponents.vue'
import { ContactsMixin } from '../views/mixins/ContactsMixin'
import { LoginMixin } from '../views/mixins/LoginMixin'
export default {
    components: {
        Card,
        DivideComponents,
    },
    mixins: [ContactsMixin, LoginMixin],
}
</script>
