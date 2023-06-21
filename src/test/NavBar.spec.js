import NavBar from '../components/fields/NavBar.vue'
import { describe, it, expect, vi } from 'vitest'
import createWrapper from './mockFacktory'
import { changeState } from './addValues'

describe('NavBar.vue', async () => {
    const wrapper = createWrapper(NavBar)

    it('should logo navigate to main page', async () => {
        let logo = wrapper.find('router-link-stub')
        // console.log(wrapper.html())
        expect(logo.attributes().to).toEqual('/')
    })

    it('should render logo', async () => {
        let logo = wrapper.find('#logo-icon')
        expect(logo.isVisible()).toBeTruthy()
    })
    it('should show user image if is not set avatar url', async () => {
        // let logo = wrapper.findAll('md-icon-stub')
        expect(wrapper.html()).contain('person')
    })
    it('should show user image if is not set avatar url', async () => {
        const button = wrapper.findAll('md-menu-item-stub')
        // console.log(wrapper.html())
        await button.at(1).trigger('click')
        // let logo = wrapper.findAll('md-menu-item-stub')
        // await logo.at(0).trigger('click')
        // expect(logo.at(0).text()).toBe('person')
    })
})
