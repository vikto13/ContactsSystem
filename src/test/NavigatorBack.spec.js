import NavigatorBack from '../components/utils/NavigatorBack.vue'
import { describe, it, vi, expect } from 'vitest'
import createWrapper from './mockFacktory'
import { changeState } from './addValues'

describe('NavigatorBack.vue', async () => {
    const propsData = {
        goBackPath: '/goBackPath',
    }
    const wrapper = createWrapper(NavigatorBack, { propsData })

    it('should trigger route change on button click', async () => {
        const button = wrapper.find("md-button-stub")
        vi.spyOn(wrapper.vm.$router, "push")
        await button.trigger("click")

        expect(wrapper.vm.$router.push).toHaveBeenCalled([propsData.goBackPath])

    })
})
