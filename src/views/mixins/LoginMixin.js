import InputBoxIcon from "../../components/InputBoxIcon.vue"
export const LoginMixin = {
    components: {
        InputBoxIcon
    },
    data() {
        return {
            submit: false,
            email: '',
            password: '',
            secPassword: '',

            name: '',




            message: {
                street: 'Gatvė turi būti įvesta',
                street_number: 'Gatvės numerys turi būti įvestas',
                city: 'Miestas turi būti įvestas',
                country: 'Šalis turi būti įvestas',
                name: "Pavadinimas turi būti įvestas",
                surnmae: "Pavardė turi būti įvesta"
            }
        }
    },
    computed: {
        comparePasswords() {
            return this.submit
                ? this.password == this.secPassword
                    ? null
                    : `Slaptažodžiai turi būti vienodi`
                : null
        },
    },
    methods: {
        isInvalid(input) {
            return !input && this.submit;
        },
        emailMessage(email) {
            return !email
                ? `Elektroninis paštas turi būti įvestas`
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? `Elektroninis paštas turi būti validus`
                    : null;
        },





    },
    methods: {
        showEmailMessage() {
            return (
                this.submit &&
                (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            );
        },
        showPasswordMessage(password) {
            return this.submit && (!password || password.length < 8);
        },
        passwordMessage(password) {
            return !password
                ? `Slaptažodis turi būti įvestas`
                : password.length < 8
                    ? `Slaptažodis turi būti sudarytas iš 8 raidžių`
                    : null;
        },
        isInvalid(input) {
            return !input && this.submit;
        },

        messageById(info) {
            return !Object.values(info)[0] ? this.message[Object.keys(info)[0]] : null
        }
    }
}