import InputBoxIcon from "../../components/InputBoxIcon.vue"
export const LoginMixin = {
    components: {
        InputBoxIcon
    },
    // beforeMount() {
    //     this.submit = false
    // },
    data() {
        return {
            submit: false,
            email: '',
            password: '',
            secPassword: '',

            name: ''
        }
    },
    computed: {
        passwordMessage() {
            return !this.password
                ? `Slaptažodis turi būti įvestas`
                : this.password.length < 8
                    ? `Slaptažodis turi būti sudarytas iš 8 raidžių`
                    : null;
        },
        showPasswordMessage() {
            return this.submit && (!this.password || this.password.length < 8);
        },
        nameMessage() {
            return !this.name ? 'Pavadinimas turi būti įvestas' : null
        },
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
        showEmailMessage(email) {
            return (
                this.submit &&
                (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            );
        },
    }
}