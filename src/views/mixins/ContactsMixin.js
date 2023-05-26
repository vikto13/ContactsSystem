import { mapGetters, mapActions } from "vuex";


export const ContactsMixin = {
    computed: {
        ...mapGetters(["contacts", "currentPage", "sizeOfPaginate", "contact"]),
        showCards: {
            get() {
                let size = this.currentPage * this.sizeOfPaginate;

                if (this.contacts.length == size && this.currentPage) {
                    this.$store.commit("previuosPage");
                    size = size - this.sizeOfPaginate;
                }
                return this.contacts.slice(size, size + this.sizeOfPaginate);
            },
            set() {

            }
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
                        cancelAction: () => { },
                    });
                } else {
                    this.triggerDialog("add-contacts");
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
}