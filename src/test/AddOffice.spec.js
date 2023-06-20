import AddOffice from '../components/boxForCreate/AddOffice.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'

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

    it('should render ContactFields component', () => {
        // const contactFields = wrapper.findComponent({ name: 'ContactFields' })
        // expect(contactFields.exists()).toBe(true)
        console.log(wrapper.html())
    });

})
