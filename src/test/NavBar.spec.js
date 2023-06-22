import NavBar from '../components/fields/NavBar.vue'
import { describe, it, expect, vi } from 'vitest'
import createWrapper from './mockFacktory'

describe('NavBar.vue', async () => {
    const wrapper = createWrapper(NavBar)

    it('should logo navigate to main page', async () => {
        let logo = wrapper.find('router-link-stub')
        expect(logo.attributes().to).toEqual('/')
    })

    it('should render logo', async () => {
        let logo = wrapper.find('#logo-icon')
        expect(logo.isVisible()).toBeTruthy()
    })
    it('should show user image if is not set avatar url', async () => {
        expect(wrapper.html()).contain('person')
    })
    it('should navigate to login page if log out and clear token', async () => {
        vi.useFakeTimers()
        const button = wrapper.findAll('md-menu-item-stub')
        vi.spyOn(wrapper.vm.$router, 'push')

        await button.at(1).trigger('click')
        await vi.runAllTimersAsync()
        expect(wrapper.vm.$router.push.calls[0]).contain('/admin/login')
    })
})
