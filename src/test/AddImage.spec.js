import AddImage from '../components/fields/AddImage.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'

describe('AddImage.vue', async () => {
    let wrapper = createWrapper(AddImage)

    it('should upload image when button is pressed', async () => {
        expect(Boolean(wrapper.vm.$store.getters.image.result)).toBeFalsy()
        await wrapper.find('button').trigger('click')
        expect(Boolean(wrapper.vm.$store.getters.image.result)).toBeTruthy()
    })

    it('should destroy image state', async () => {
        wrapper.destroy()
        let { image } = wrapper.vm.$store.getters
        for (let info in image) {
            expect(Boolean(image[info])).toBeFalsy()
        }
    })
})
