import InputBoxIcon from '../components/utils/InputBoxIcon.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('InputBoxIcon.vue', async () => {
    const propsData = {
        iconName: 'house',
        title: 'Test1',
        bottomText: 'Test2',
        isNotValid: true,
    }

    let wrapper = createWrapper(InputBoxIcon, { propsData })

    it('should render titlet', async () => {
        let title = wrapper.find('.form-label')
        expect(title.text()).toBe(propsData.title)
    })

    it('should show icon', async () => {
        // const iconElement = wrapper.find('.md-icon')
        // console.log(iconElement.text())
        // console.log(wrapper.html())
    })

    it('should not render title if is not set', async () => {
        let propsData = { title: '' }
        wrapper = createWrapper(InputBoxIcon, { propsData })
        expect(wrapper.text()).toContain(propsData.title)
        let label = wrapper.find('form-label')
        expect(label.exists()).toBeFalsy()
    })
    // it('should render correct buttons', async () => {
    //     let buttons = wrapper.findAll('.md-icon-button');
    //     expect(buttons).toHaveLength(propsData.buttons.length)
    //     propsData.buttons.map(({ name }, index) => {
    //         expect(buttons.at(index).text()).toBe(name)
    //     })
    // });

    // it('should check if buttons are showable', async () => {
    //     let buttons = wrapper.findAll('.md-icon-button');
    //     propsData.buttons.map(({ show }, index) => {
    //         expect(buttons.at(index).isVisible()).toBe(show)
    //     })
    // });
})
