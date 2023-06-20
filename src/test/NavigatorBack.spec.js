import NavigatorBack from '../components/utils/NavigatorBack.vue'
import { describe, it, expect } from 'vitest'
import createWrapper from './mockFacktory'
import { changeState } from './addValues'

describe('NavigatorBack.vue', async () => {
    const propsData = {
        goBackPath: '/goBackPath',
    }
    const wrapper = createWrapper(NavigatorBack, { propsData })

    it('should trigger route change on button click', async () => {
        const buttonStub = wrapper.findComponent({ name: 'md-button-stub' })

        // await button.trigger('click')
        // await wrapper.vm.$nextTick()
        console.log(buttonStub)
        console.log(wrapper.html())
    })
})
