import { mapGetters, mapActions } from 'vuex'

export const ContactsMixin = {
    computed: {
        ...mapGetters([
            'currentPage',
            'sizeOfPaginate',
            'employees',
            'employee',
        ]),
        showCards: {
            get() {
                let size = this.currentPage * this.sizeOfPaginate
                if (this.employees.length == size && this.currentPage) {
                    this.$store.commit(' SET_TO_PREVIUOS_PAGE')
                    size = size - this.sizeOfPaginate
                }
                return this.employees.slice(size, size + this.sizeOfPaginate)
            },
            set() { },
        },
    },
    methods: {
        ...mapActions([
            'FIND_EMPLOYEE',
            'SHOW_MESSAGE',
            'SHOW_DIALOG',
            'DELETE_EMPLOYEE',
            'FETCH_EMPLOYEES',
        ]),
        getAddress({ expand }) {
            let { city, country, street, street_number } = expand.office_id
            return ` ${country}, ${city}, ${street} ${street_number}`
        },
        async see(id) {
            this.$router.push(`/contact/${id}`)
        },
        async edit({ button, id }) {
            await this.FIND_EMPLOYEE(id)
            if (button) {
                this.SHOW_MESSAGE({
                    title: 'Ar tikrai norite ištrinti kontaktą?',
                    content: `Kontaktas: ${this.employee.name} ${this.employee.surname}`,
                    action: async () => {
                        this.tryCatchForAPIAction(async () => {
                            await this.DELETE_EMPLOYEE()
                            await this.FETCH_EMPLOYEES()
                            this.$store.commit('REMOVE_EMPLOYEE')
                        })
                    },
                    cancelAction: () => {
                        this.$store.commit('REMOVE_EMPLOYEE')
                    },
                })
            } else {
                this.SHOW_DIALOG('add-contacts')
            }
        },
        findProperty(obj, propertyName) {
            for (let key in obj) {
                if (key === propertyName) {
                    return obj[key]
                }

                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    const result = findProperty(obj[key], propertyName)

                    if (result !== undefined) {
                        return result
                    }
                }
            }

            return undefined
        },
    },
}
