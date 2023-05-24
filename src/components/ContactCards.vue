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
        :contents="[
          `Telefono nr:  ${contact.phone_number}`,
          `El paštas: ${contact.email} `,
          `Adresas: `,
        ]"
        :id="contact.id"
        @buttonClicked="edit"
        @cardClicked="see"
      ></card>
    </divide-components>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "./Card.vue";
import DivideComponents from "./DivideComponents.vue";
export default {
  components: {
    Card,
    DivideComponents,
  },
  computed: {
    ...mapGetters(["contacts", "currentPage", "sizeOfPaginate", "contact"]),
    showCards() {
      let size = this.currentPage * this.sizeOfPaginate;

      if (this.contacts.length == size && this.currentPage) {
        this.$store.commit("previuosPage");
        size = size - this.sizeOfPaginate;
      }
      return this.contacts.slice(size, size + this.sizeOfPaginate);
    },
  },
  methods: {
    ...mapActions([
      "findContact",
      "triggerDialog",
      "deleteContact",
      "fetchContacts",
      "triggerMessage",
    ]),
    async see(id) {
      this.$router.push(`/contact/${id}`);
    },
    async edit({ button, id }) {
      try {
        await this.findContact(id);
        if (button) {
          this.triggerMessage({
            title: "Ar tikrai norite ištrinti kontaktą?",
            content: `Kontaktas: ${this.contact.name} ${this.contact.surname}`,
            action: async () => {
              await this.deleteContact();

              await this.fetchContacts();
            },
          });
        } else {
          this.triggerDialog("add-contacts");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
