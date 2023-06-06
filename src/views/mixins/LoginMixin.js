import { mapActions, mapGetters } from "vuex";
import InputBoxIcon from "../../components/InputBoxIcon.vue"
export const LoginMixin = {
    components: {
        InputBoxIcon
    },
    computed: {
        ...mapGetters(["alert", "messageTexts", "messageTexts", "messageIsSubmitted"]),
        user: {
            get() {
                return this.$store.state.User.user
            },
            se(user) {
                this.$store.state.User.user = user
            },
        },
    },
    methods: {
        ...mapActions(["showAlert", "disableAlert", "triggerMessage", "resetPassword"]),
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
        havePermission(permission) {
            return this.user.token ? this.user.permissions_id[permission] : false;
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
                message = {
                    title: "Įvyko klaida",
                    content: `Pabandykite dar kartą`,
                };
            }
            this.triggerMessage({
                ...message,
                isAlert: true,
            });
        },

        async tryCatchForAPIAction(action) {
            try {
                await action()
                this.alert.showAlert && this.disableAlert();
            } catch (err) {
                // this.showAlert(404);
            }
        }
    }

}