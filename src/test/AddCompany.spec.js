import AddCompany from '../components/boxForCreate/AddCompany.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('AddCompany.vue', async () => {
    let wrapper = createWrapper(AddCompany)

    it('should show correct input text', async () => {
        let input = wrapper.findAll('input')
        expect(input.at(0).element.value).toBe("Test1")
    })

    it('should show correct button text when editing', async () => {
        wrapper = await mergeDeep(wrapper, changeState('company', { id: [] }))
        let button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`Pridėti`)
    })

    it('should show correct button text when creating', async () => {
        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        let button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`Redaguoti`)
    })

})
