import Pagination from '../components/fields/Pagination.vue'
import { describe, it, vi, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('Pagination.vue', async () => {

    let wrapper = createWrapper(Pagination)

    it("should not show pagination button if items are less than given pagine size", async () => {
        wrapper = mergeDeep(wrapper, changeState("employees", Array(1).fill(null)))
        let pageButtons = wrapper.findAll('md-button-stub')
        expect(pageButtons.at(0).attributes().style.includes("opacity: 0")).toBeTruthy()
        expect(pageButtons.at(1).attributes().style.includes("opacity: 0")).toBeTruthy()
    })

    it("should show navigate to next page", async () => {
        wrapper = await mergeDeep(wrapper, changeState("employees", Array(30).fill(null)))
        let pageButtons = wrapper.findAll('md-button-stub')
        expect(pageButtons.at(0).attributes().style.includes("opacity: 0")).toBeTruthy()
        expect(pageButtons.at(1).attributes().style.includes("opacity: 0")).toBeFalsy()
    })

    it("should show navigate to previous page", async () => {
        wrapper = await mergeDeep(wrapper, changeState("paginate", { currentPage: 1 }))
        let pageButtons = wrapper.findAll('md-button-stub')
        expect(pageButtons.at(0).attributes().style.includes("opacity: 0")).toBeFalsy()
        expect(pageButtons.at(1).attributes().style.includes("opacity: 0")).toBeFalsy()
    })

    it("should disable the next button when is on the last page ", async () => {
        wrapper = await mergeDeep(wrapper, changeState("paginate", { currentPage: 6 }))
        let pageButtons = wrapper.findAll('md-button-stub')
        expect(pageButtons.at(0).attributes().style.includes("opacity: 0")).toBeFalsy()
        expect(pageButtons.at(1).attributes().style.includes("opacity: 0")).toBeTruthy()
    })

    it("should change button to showable when going to previuos page", async () => {
        let pageButtons = wrapper.findAll('md-button-stub')
        expect(pageButtons.at(0).attributes().style.includes("opacity: 0")).toBeFalsy()
        expect(pageButtons.at(1).attributes().style.includes("opacity: 0")).toBeTruthy()
        // expect(button.at(1).classes().includes('active')).toBeTruthy()
        await pageButtons.at(0).trigger('click')
        expect(pageButtons.at(0).attributes().style.includes("opacity: 0")).toBeFalsy()
        expect(pageButtons.at(1).attributes().style.includes("opacity: 0")).toBeTruthy()
    });
})
