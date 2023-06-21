import FieldToCreate from '../components/fields/FieldToCreate.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('FieldToCreate.vue', async () => {
    let propsData = {
        text: 'Test1',
    }
    let wrapper = createWrapper(FieldToCreate, { propsData })

    it('should render correct button with provided text', async () => {
        let button = wrapper.find('.md-icon-button')
        let belowText = wrapper.find('div')
        expect(button.exists()).toBeTruthy()
        expect(belowText.text()).toBe(`add ${propsData.text}`)
    })
})
