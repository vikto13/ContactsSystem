import { mapActions, mapGetters } from 'vuex'
import InputBoxIcon from '../../components/utils/InputBoxIcon.vue'
export const LoginMixin = {
    components: {
        InputBoxIcon,
    },
    computed: {
        ...mapGetters([
            'alert',
            'messageTexts',
            'messageTexts',
            'messageIsSubmitted',
        ]),
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
        ...mapActions([
            'showAlert',
            'disableAlert',
            'triggerMessage',
            'resetPassword',
        ]),
        showCompareMessage(password, secPassword) {
            return this.messageIsSubmitted && password !== secPassword
        },
        showEmailMessage(email) {
            return (
                this.messageIsSubmitted &&
                (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            )
        },
        showPasswordMessage(password) {
            return this.messageIsSubmitted && (!password || password.length < 8)
        },
        emailMessage(email) {
            return !email
                ? `Elektroninis paštas turi būti įvestas`
                : `Elektroninis paštas turi būti validus`
        },
        phoneMessage(phone_number) {
            return phone_number
                ? phone_number[0] != '+'
                    ? 'Turi prasidėti pliuso(+) ženklu'
                    : phone_number.length > 2 && /^\+\d+$/.test(phone_number)
                    ? ''
                    : 'Numeris turi būti validus'
                : ''
        },
        isInvalid(input) {
            switch (Object.keys(input)[0]) {
                case 'password':
                    return this.showPasswordMessage(Object.values(input)[0])
                case 'email':
                    return this.showEmailMessage(Object.values(input)[0])
                case 'street_number':
                    return (
                        !Boolean(/\d/.test(Object.values(input)[0])) &&
                        this.messageIsSubmitted
                    )
                case 'phone_number':
                    return (
                        Boolean(this.phoneMessage(Object.values(input)[0])) &&
                        this.messageIsSubmitted
                    )
                default:
                    return !Object.values(input)[0] && this.messageIsSubmitted
            }
        },
        messageById(info) {
            switch (Object.keys(info)[0]) {
                case 'email':
                    return this.emailMessage(Object.values(info)[0])
                case 'phone_number':
                    return this.phoneMessage(Object.values(info)[0]) || '/n'
                default:
                    return this.messageTexts[Object.keys(info)[0]]
            }
        },
        havePermission(permission) {
            return this.user.token
                ? this.user.permissions_id[permission]
                : false
        },
        async updatePassword() {
            let message
            try {
                await this.resetPassword()
                message = {
                    title: 'Žinutė išsiųsta',
                    content: `Patikrinkite savo elektroninį paštą`,
                }
            } catch (err) {
                message = {
                    title: 'Įvyko klaida',
                    content: `Pabandykite dar kartą`,
                }
            }
            this.triggerMessage({
                ...message,
                isAlert: true,
            })
        },

        async tryCatchForAPIAction(action) {
            try {
                await action()
                this.alert.showAlert && this.disableAlert()
            } catch (err) {
                console.log(err)
                // this.showAlert(404);
            }
        },
    },
}
