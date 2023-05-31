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





            message: {
                street: 'Gatvė turi būti įvesta',
                street_number: 'Gatvės numerys turi būti įvestas',
                city: 'Miestas turi būti įvestas',
                country: 'Šalis turi būti įvestas',
                name: "Pavadinimas turi būti įvestas",
                surname: "Pavardė turi būti įvesta",
                position: 'Pozicija turi būti įvesta',
                phone_number: 'Telefono numerys turi būti įvestas',
                second_password: `Slaptažodžiai turi būti vienodi`,
                password: 'Įveskite slaptažodį',
            }
        }
    },
    methods: {
        showCompareMessage(password, secPassword) {
            return this.submit && (password !== secPassword)
        },
        showEmailMessage(email) {
            return (
                this.submit &&
                (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            );
        },
        emailMessage(email) {
            return !email
                ? `Elektroninis paštas turi būti įvestas`
                // : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                : `Elektroninis paštas turi būti validus`

        },
        showPasswordMessage(password) {
            return this.submit && (!password || password.length < 8);
        },
        passwordMessage(password) {
            return password.length < 8
                ? `Slaptažodis turi būti sudarytas iš 8 raidžių`
                : `Slaptažodis turi būti įvestas`
        },
        isInvalid(input) {
            switch (Object.keys(input)[0]) {
                case 'password':
                    return this.showPasswordMessage(Object.values(input)[0])
                case 'email':
                    return this.showEmailMessage(Object.values(input)[0])
                default:
                    return !Object.values(input)[0] && this.submit
            }
        },
        messageById(info) {
            if (Object.keys(info)[0] == 'email') {
                return this.emailMessage(Object.values(info)[0])
            }
            return this.message[Object.keys(info)[0]]
        },


        async updatePassword() {
            let message;
            try {
                await this.resetPassword();
                message = {
                    title: "Žinutė išsiųsta",
                    content: `Patikrinkite savo elektroninį paštą`,
                };
            } catch (err) {
                console.log(err)
                message = {
                    title: "Įvyko klaida",
                    content: `Pabandykite dar kartą`,
                };
            }
            this.triggerMessage({
                ...message,
                isAlert: true,
                action: async () => { },
            });
        },
    }
}