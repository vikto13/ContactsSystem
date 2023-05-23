<template>
  <div class="md-layout md-gutter md-alignment-center" style="margin-top: 2rem">
    <divide-components
      v-for="(contact, index) in showCards"
      :key="index"
      :size-xl="20"
      :size-l="25"
      :size-m="30"
    >
      <card
        :buttons="['edit', 'delete']"
        :title="`${contact.name} ${contact.surname}`"
        :subtitle="`Pozicija: ${contact.position} `"
        :contents="[`Telefono nr:  ${contact.phone_number}`, `El paštas: ${contact.email} `, `Adresas: `]"
      ></card>
    </divide-components>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Card from "./Card.vue";
import DivideComponents from "./DivideComponents.vue";
export default {
  components: {
    Card,
    DivideComponents,
  },
  computed: {
    ...mapGetters(["contacts","currentPage","sizeOfPaginate"]),
    showCards() {
   
      let size=this.currentPage*this.sizeOfPaginate
      return this.contacts.slice(size, size + this.sizeOfPaginate)
    }
  },
};
</script>
