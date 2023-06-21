import DialogBox from '../components/fields/DialogBox.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'
import moduleName from 'module'

describe('DialogBox.vue', async () => {
    let wrapper = createWrapper(DialogBox)

    it('should show dialog when passing screen name', async () => {
        let component = wrapper.findComponent({ name: 'md-dialog-content' })
        // expect(alertMessage.isVisible()).toBeFalsy()
        wrapper = await mergeDeep(
            wrapper,
            changeState('dialog', {
                show: true,
                screen: 'add-contacts',
            })
        )
        // expect(alertMessage.isVisible()).toBeTruthy()

        // console.log(wrapper.html())
        // console.log(component.vm.$children.values())
    })

    // it('should show correct alert message', async () => {
    //     let { message } = wrapper.vm.$store.getters.alert
    //     for (let info in message) {
    //         wrapper = await mergeDeep(
    //             wrapper,
    //             changeState('alert', { showMessage: info })
    //         )
    //         let alertMessage = wrapper.find('.alert')
    //         expect(alertMessage.text()).toBe(message[info])
    //     }
    // })
})
