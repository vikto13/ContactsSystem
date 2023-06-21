import { mapActions, mapGetters } from 'vuex'
import InputBoxIcon from '../../components/utils/InputBoxIcon.vue'
export const LoginMixin = {
    components: {
        InputBoxIcon,
    },
    computed: {
        ...mapGetters(['alert', 'messageTexts', 'messageIsSubmitted']),
        user: {
            get() {
                return this.$store.state.User.user
            },
            set(user) {
                this.$store.state.User.user = user
            },
        },
    },
    methods: {
        ...mapActions([
            'DISABLE_ALERT',
            'DISABLE_ALERT',
            'SHOW_MESSAGE',
            'RESET_PASSWORD',
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
                        this.messageIsSubmitted &&
                        !Boolean(/\d/.test(Object.values(input)[0]))
                    )
                case 'phone_number':
                    return (
                        this.messageIsSubmitted &&
                        Boolean(this.phoneMessage(Object.values(input)[0]))
                    )
                default:
                    return this.messageIsSubmitted && !Object.values(input)[0]
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
                await this.RESET_PASSWORD()
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
            this.SHOW_MESSAGE({
                ...message,
                isAlert: true,
            })
        },

        async tryCatchForAPIAction(action) {
            try {
                await action()
            } catch (err) {
                this.SHOW_MESSAGE({
                    title: 'Įvyko klaida',
                    content: err.message,
                    isAlert: true,
                })
            }
        },
    },
}
