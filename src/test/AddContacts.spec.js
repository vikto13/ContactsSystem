import AddContacts from '../components/boxForCreate/AddContacts.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'

describe('AddContacts.vue', async () => {
    let wrapper = createWrapper(AddContacts)

    it('should render ContactFields component', () => {
        const contactFields = wrapper.findComponent({ name: 'ContactFields' })
        expect(contactFields.exists()).toBe(true)
    })

    it('should render CompanyDetailsSelect component', () => {
        const companyDetailsSelect = wrapper.findComponent({
            name: 'CompanyDetailsSelect',
        })
        expect(companyDetailsSelect.exists()).toBe(true)
    })

    it('should remove employee states when the component is destroyed', () => {
        wrapper.destroy()
        let { employee } = wrapper.vm.$store.state
        for (let info in employee) {
            expect(Boolean(employee[info])).toBeFalsy()
        }
    })
    it('should disable message when the component is destroyed', () => {
        wrapper.destroy()
        expect(wrapper.vm.$store.state.Message.message.submit).toBeFalsy()
    })
})
