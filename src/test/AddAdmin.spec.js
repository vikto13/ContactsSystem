import AddAdmin from '../components/boxForCreate/AddAdmin.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'
describe('AddAdmin.vue', async () => {
    let data = () => ({
        title: {
            null: 'Test',
            0: 'Test1',
            1: 'Test2',
        },
        button: {
            null: 'Test',
            0: 'Test1',
            1: 'Test2',
        },
    })
    let wrapper = createWrapper(AddAdmin, { data })

    it('should show correct input text', async () => {
        let input = wrapper.findAll('input')
        let { name, email } = wrapper.vm.$store.getters.admin

        ;[name, email].map((adminState, index) => {
            expect(input.at(index).element.value).toBe(adminState)
        })
    })

    it('should update the admin name when input value changed', async () => {
        let name = '2Test'
        let input = wrapper.findAll('input')
        await input.at(0).setValue(name)
        expect(input.at(0).element.value).toBe(name)
        expect(wrapper.vm.$store.getters.admin.name).toBe(name)
    })

    it('should trigger the save method when the button is clicked', async () => {
        await wrapper.vm.save()
        let button = wrapper.findComponent({ name: 'md-button' })
        console.log(button.text())
        // expect(wrapper.vm.save).toHaveBeenCalled()
        // await saveButton.trigger('click')
        // expect(wrapper.vm.save).toHaveBeenCalled();
    })

    it('should show correct title', async () => {
        await Promise.all(
            [null, 0, 1].map(async (value) => {
                let info = { admin: { whatDo: value } }
                wrapper = await mergeDeep(
                    wrapper,
                    changeState('adminState', info)
                )
                let title = wrapper.find('h3')
                console.log(title.text(), info)
            })
        )

        // expect(wrapper.vm.save).toHaveBeenCalled()
        // await saveButton.trigger('click')
        // expect(wrapper.vm.save).toHaveBeenCalled();
    })
})
