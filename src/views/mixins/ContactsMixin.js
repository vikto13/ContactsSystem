import { mapGetters, mapActions } from "vuex";

export const ContactsMixin = {
    computed: {
        ...mapGetters(["currentPage", "sizeOfPaginate", "employees", "employee"]),
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
        ...mapActions(["findEmployee", "triggerMessage", "triggerDialog", "deleteEmployee", "fetchEmployees"]),
        getAddress({ office_id }) {
            let { city, country, street, street_number } = office_id;
            return ` ${country}, ${city}, ${street} ${street_number}`;
        },
        async see(id) {
            this.$router.push(`/contact/${id}`);
        },
        async edit({ button, id }) {
            await this.findEmployee(id)
            if (button) {
                this.triggerMessage({
                    title: "Ar tikrai norite ištrinti kontaktą?",
                    content: `Kontaktas: ${this.employee.name} ${this.employee.surname}`,
                    action: async () => {
                        this.tryCatchForAPIAction(async () => {
                            await this.deleteEmployee();
                            await this.fetchEmployees();
                            this.$store.commit("clearEmployee");
                        })
                    },
                    cancelAction: () => {
                        this.$store.commit("clearEmployee");
                    },
                });
            } else {
                this.triggerDialog("add-contacts");
            }

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