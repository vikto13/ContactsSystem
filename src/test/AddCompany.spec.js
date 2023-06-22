import AddCompany from '../components/boxForCreate/AddCompany.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('AddCompany.vue', async () => {
    let wrapper = createWrapper(AddCompany)

    it('should show correct input text', async () => {
        let input = wrapper.findAll('input')
        expect(input.at(0).element.value).toBe('Test1')
    })

    it('should show correct button text when editing', async () => {
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { id: [] } })
        )
        let button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`Pridėti`)
    })

    it('should show correct button text when creating', async () => {
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { id: [1, 2, 3] } })
        )
        let button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`Redaguoti`)
    })
    it('should show message if name is not valid', async () => {
        let message = wrapper.find('input')
        expect(message.classes()).not.contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { name: '' } })
        )
        let button = wrapper.findComponent({ name: 'md-button' })
        await button.trigger('click')
        expect(message.classes()).contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { name: 'test' } })
        )
        expect(message.classes()).not.contain('is-invalid')
    })
})
