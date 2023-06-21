import AlertMessage from '../components/fields/AlertMessage.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('AlertMessage.vue', async () => {
    let wrapper = createWrapper(AlertMessage)

    it('should show alert message when showAlert is true', async () => {
        let alertMessage = wrapper.find('.alert')
        expect(alertMessage.isVisible()).toBeFalsy()
        wrapper = await mergeDeep(
            wrapper,
            changeState('alert', { showAlert: true })
        )
        expect(alertMessage.isVisible()).toBeTruthy()
    })

    it('should show correct alert message', async () => {
        let { message } = wrapper.vm.$store.getters.alert
        for (let info in message) {
            wrapper = await mergeDeep(
                wrapper,
                changeState('alert', { showMessage: info })
            )
            let alertMessage = wrapper.find('.alert')
            expect(alertMessage.text()).toBe(message[info])
        }
    })
})
