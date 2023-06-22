import AddOffice from '../components/boxForCreate/AddOffice.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('AddOffice.vue', async () => {
    let data = () => ({
        inputs: [
            {
                id: 'street',
                title: 'Gatvė',
                placeholder: 'Įveskite gatvę...',
            },
            {
                id: 'street_number',
                title: 'Gatvės numeris',
                placeholder: 'Įveskite gatvės numerį...',
            },
            {
                id: 'city',
                title: 'Miestas',
                placeholder: 'Įveskite miestą...',
            },
            {
                id: 'country',
                title: 'Šalis',
                placeholder: 'Įveskite šalį...',
            },
        ],
    })

    let wrapper = createWrapper(AddOffice, { data })

    it('should show message if input texts is not valid', async () => {
        let office = {
            street: 'street',
            country: 'country',
            city: 'city',
            street_number: 'street1',
        }
        let button = wrapper.findComponent({ name: 'md-button' })
        await button.trigger('click')
        let inputs = wrapper.findAll('input')
        for (let info in data().inputs) {
            expect(inputs.at(info).classes()).toContain('is-invalid')
        }
        wrapper = await mergeDeep(wrapper, changeState('office', office))
        for (let info in data().inputs) {
            expect(inputs.at(info).classes()).not.toContain('is-invalid')
        }
        office.street_number = 'number'
        wrapper = await mergeDeep(wrapper, changeState('office', office))
        expect(inputs.at(1).classes()).toContain('is-invalid')
    })

    it('should show correct button text', async () => {
        let office = {
            id: 'id',
        }
        wrapper = await mergeDeep(wrapper, changeState('office', office))
        let button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe('Pakeisti')

        office.id = null
        wrapper = await mergeDeep(wrapper, changeState('office', office))
        expect(button.text()).toBe('Pridėti')
    })
})
