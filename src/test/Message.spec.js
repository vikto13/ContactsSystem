import Message from '../components/fields/Message.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('Message.vue', async () => {
    let wrapper = createWrapper(Message)

    it('should show alert message', async () => {
        wrapper = await mergeDeep(
            wrapper,
            changeState('Message', {
                message: {
                    active: true,
                    isAlert: true,
                },
            })
        )
        let alert = wrapper.find('md-dialog-alert-stub')
        expect(alert.exists()).toBeTruthy()
    })

    it('should show confirm message', async () => {
        wrapper = await mergeDeep(
            wrapper,
            changeState('Message', {
                message: {
                    active: true,
                    isAlert: false,
                },
            })
        )
        let alertConfim = wrapper.find('md-dialog-confirm-stub')
        expect(alertConfim.exists()).toBeTruthy()
    })

})
