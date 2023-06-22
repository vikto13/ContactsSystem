import Card from '../components/utils/Card.vue'
import { describe, it, expect, vi } from 'vitest'
import createWrapper from './mockFacktory'

describe('Card.vue', async () => {
    const propsData = {
        title: 'Test',
        subtitle: 'Test1',
        contents: ['Content', 'Content'],
        buttons: [
            { name: 'delete', show: true },
            { name: 'edit', show: false },
        ],
        id: 'TestId',
    }

    const wrapper = createWrapper(Card, { propsData })

    it('should render correct title', async () => {
        let title = wrapper.find('.md-title')
        expect(title.text()).toBe(propsData.title)
    })

    it('should render correct subtitle', async () => {
        let title = wrapper.find('.md-subhead')
        expect(title.text()).toBe(propsData.subtitle)
    })

    it('should render correct contents', async () => {
        let contents = wrapper.findAll('p')
        expect(contents).toHaveLength(propsData.contents.length)
        propsData.contents.map((text, index) => {
            expect(contents.at(index).text()).toBe(text)
        })
    })

    it('should render correct buttons', async () => {
        let buttons = wrapper.findAll('.md-icon-button')
        expect(buttons).toHaveLength(propsData.buttons.length)
        propsData.buttons.map(({ name }, index) => {
            expect(buttons.at(index).text()).toBe(name)
        })
    })

    // it('should pressed correct button', async () => {
    //     let buttons = wrapper.findAll('md-button-stub')
    //     await buttons.at(0).trigger('click')
    //     await buttons.at(1).trigger('click')
    //     expect(wrapper.emitted().buttonClicked[0][0].button).toEqual(0)
    //     expect(wrapper.emitted().buttonClicked[1][0].button).toEqual(1)
    // })
})
