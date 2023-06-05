import { mapActions, mapGetters } from "vuex";
import InputBoxIcon from "../../components/InputBoxIcon.vue"
export const LoginMixin = {
    components: {
        InputBoxIcon
    },
    computed: {
        ...mapGetters(["alert", "messageTexts", "messageTexts", "messageIsSubmitted"])
    },
    data() {
        return {
            email: '',
            password: '',
            secPassword: '',
        }
    },
    methods: {
        ...mapActions(["showAlert", "disableAlert", "triggerMessage"]),
        showCompareMessage(password, secPassword) {
            return this.messageIsSubmitted && (password !== secPassword)
        },
        showEmailMessage(email) {
            return (
                this.messageIsSubmitted &&
                (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            );
        },
        showPasswordMessage(password) {
            return this.messageIsSubmitted && (!password || password.length < 8);
        },


        emailMessage(email) {
            return !email
                ? `Elektroninis paštas turi būti įvestas`
                : `Elektroninis paštas turi būti validus`

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
                    return !Object.values(input)[0] && this.messageIsSubmitted
            }
        },


        messageById(info) {
            if (Object.keys(info)[0] == 'email') {
                return this.emailMessage(Object.values(info)[0])
            }
            return this.messageTexts[Object.keys(info)[0]]
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
            // this.triggerMessage({
            //     ...message,
            //     isAlert: true,
            // });
        },


        async tryCatchForAPIAction(action) {
            try {
                await action()
                // this.alert.showAlert && this.disableAlert();
            } catch (err) {
                console.log(err)
                if (err.status == 404 || err.status == 400 || err.response.status == 400) {
                    this.triggerMessage({
                        title: "Jums leidimas tokiam veiksmui nėra duotas",
                        content: `Paprašykite admino, jog suteiktų tokią galimybę`,
                        isAlert: true,
                    });

                } else {
                    this.showAlert(404);
                }
            }
        }
    }

}