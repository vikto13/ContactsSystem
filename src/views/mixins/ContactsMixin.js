import { mapGetters, mapActions } from "vuex";

export const ContactsMixin = {
    computed: {
        ...mapGetters(["currentPage", "sizeOfPaginate", "employees", "findEmployee"]),
        showCards: {
            get() {
                let size = this.currentPage * this.sizeOfPaginate;

                if (this.employees.length == size && this.currentPage) {
                    this.$store.commit("previuosPage");
                    size = size - this.sizeOfPaginate;
                }

                return this.employees.slice(size, size + this.sizeOfPaginate);
            },
            set() {
            }
        },
    },
    methods: {

        getAddress({ office_id }) {
            let { city, country, street, street_number } = office_id;
            return ` ${country}, ${city}, ${street} ${street_number}`;
        },

        async see(id) {
            this.$router.push(`/contact/${id}`);
        },
        async edit({ button, id }) {
            await this.findEmployee()
            // this.tryCatchForAPIAction(async () => {
            //     await this.findContact(id);
            //     if (button) {
            //         this.triggerMessage({
            //             title: "Ar tikrai norite ištrinti kontaktą?",
            //             content: `Kontaktas: ${this.contact.name} ${this.contact.surname}`,
            //             action: async () => {
            //                 this.tryCatchForAPIAction(async () => {
            //                     await this.deleteContact();
            //                     await this.fetchContacts();
            //                 })
            //             },
            //             cancelAction: () => { },
            //         });
            //     } else {
            //         this.triggerDialog("add-contacts");
            //     }
            // })
        },
        findProperty(obj, propertyName) {

            for (let key in obj) {
                if (key === propertyName) {
                    return obj[key];
                }

                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    const result = findProperty(obj[key], propertyName);

                    if (result !== undefined) {
                        return result;
                    }
                }
            }

            return undefined;
        }
    },
}