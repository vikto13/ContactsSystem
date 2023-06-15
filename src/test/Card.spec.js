import Card from "../components/utils/Card.vue"
import { describe, it, expect } from "vitest";
import createWrapper from "./mockFacktory";

describe("Card.vue", async () => {
    const propsData = {
        title: "Test",
        subtitle: "Test1",
        contents: ["Content", "Content"],
        buttons: [
            { name: "delete", show: true },
            { name: "edit", show: false }],
        id: "TestId"
    }

    const wrapper = createWrapper(Card, { propsData })

    it('should render correct title', async () => {
        let title = wrapper.find('.md-title');
        expect(title.text()).toBe(propsData.title)
    });

    it('should render correct subtitle', async () => {
        let title = wrapper.find('.md-subhead');
        expect(title.text()).toBe(propsData.subtitle)
    });

    it('should render correct contents', async () => {
        let contents = wrapper.findAll('p');
        expect(contents).toHaveLength(propsData.contents.length)
        propsData.contents.map((text, index) => {
            expect(contents.at(index).text()).toBe(text)
        })
    });

    it('should render correct buttons', async () => {
        let buttons = wrapper.findAll('.md-icon-button');
        expect(buttons).toHaveLength(propsData.buttons.length)
        propsData.buttons.map(({ name }, index) => {
            expect(buttons.at(index).text()).toBe(name)
        })
    });

    it('should check if buttons are showable', async () => {
        let buttons = wrapper.findAll('.md-icon-button');
        propsData.buttons.map(({ show }, index) => {
            expect(buttons.at(index).isVisible()).toBe(show)
        })
    });

    // it('shows message when clicked delete button', async () => {


    //     const button = wrapper.find('.delete-btn')
    //     button.trigger('click')
    //     // await wrapper.vm.$nextTick()
    //     // const table = wrapper.find('md-card')
    //     console.log(button);
    //     // expect(modalHeader.text()).toBe('Testing')
    //     // expect(modalHeader.classes().includes('bg-danger')).toBeTruthy()
    // });
});