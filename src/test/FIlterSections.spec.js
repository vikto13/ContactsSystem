import FilterSections from '../components/fields/FilterSections.vue'
import { describe, it, expect } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('FilterSections.vue', async () => {
    let wrapper = createWrapper(FilterSections)

    it('should render all filter sections', async () => {
        let labels = wrapper.findAll('label')
        let { filterCategories } = wrapper.vm
        expect(labels.length).toEqual(filterCategories.length)
    })

    it('should disable the select first field', async () => {
        let option = wrapper.findAll('option')
        expect(Object.values(option.at(0).attributes())).toContain('disabled')
    })
})
