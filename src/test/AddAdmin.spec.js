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

    it('should show correct title', async () => {
        let info = { admin: { whatDo: null } }

        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        let title = wrapper.find('h3')
        expect(title.text()).toBe(`${data().title.null}:`)

        info.admin.whatDo = 0
        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        title = wrapper.find('h3')
        expect(title.text()).toBe(`${data().title[0]}:`)

        info.admin.whatDo = 1
        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        title = wrapper.find('h3')
        expect(title.text()).toBe(`${data().title[1]}:`)
    })

    it('should show correct button text', async () => {
        let info = { admin: { whatDo: null } }

        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        let button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`${data().button.null}`)

        info.admin.whatDo = 0
        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`${data().title[0]}`)

        info.admin.whatDo = 1
        wrapper = await mergeDeep(wrapper, changeState('adminState', info))
        button = wrapper.findComponent({ name: 'md-button' })
        expect(button.text()).toBe(`${data().title[1]}`)
    })

    it('should show message if name is not valid', async () => {
        let button = wrapper.find('md-button-stub')
        let messages = wrapper.findAll('input')
        expect(messages.at(0).classes()).not.contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { name: '' } })
        )
        await button.trigger('click')
        expect(messages.at(0).classes()).contain('is-invalid')
    })

    it('should show message if email is not valid', async () => {
        let button = wrapper.find('md-button-stub')
        let messages = wrapper.findAll('input')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { email: 'admin@gmail.com' } })
        )
        expect(messages.at(1).classes()).not.contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { email: '' } })
        )
        await button.trigger('click')
        expect(messages.at(1).classes()).contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { email: 'test123456' } })
        )
        expect(messages.at(1).classes()).contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { email: 'test@' } })
        )
        expect(messages.at(1).classes()).contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { email: 'test@gmail' } })
        )
        expect(messages.at(1).classes()).contain('is-invalid')
        wrapper = await mergeDeep(
            wrapper,
            changeState('adminState', { admin: { email: 'test@gmail.c' } })
        )
        expect(messages.at(1).classes()).not.contain('is-invalid')
    })
})
