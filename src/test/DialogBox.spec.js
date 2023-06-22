import DialogBox from '../components/fields/DialogBox.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'
import moduleName from 'module'

describe('DialogBox.vue', async () => {
    let wrapper = createWrapper(DialogBox)

    it('should disable dialog when button is pressed', async () => {
        let button = wrapper.find('.btn')
        wrapper = await mergeDeep(
            wrapper,
            changeState('dialog', {
                show: true,
                screen: 'add-contacts',
            })
        )
        expect(wrapper.vm.$store.getters.dialog.show).toBeTruthy()
        await button.trigger('click')
        expect(wrapper.vm.$store.getters.dialog.show).toBeFalsy()
    })
})
