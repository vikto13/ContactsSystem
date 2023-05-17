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
            secPassword: ''
        }
    },
    computed: {
        emailMessage() {
            return !this.email
                ? `Elektroninis paštas turi būti įvestas`
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
                    ? `Elektroninis paštas turi būti validus`
                    : null;
        },
        showEmailMessage() {
            return (
                this.submit &&
                (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
            );
        },
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
    }
}