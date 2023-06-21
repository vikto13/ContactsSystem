import AddRelationship from '../components/boxForCreate/AddRelationship.vue'
import { describe, it, expect, vi } from 'vitest'
import createWrapper, { mergeDeep } from './mockFacktory'
import { changeState } from './addValues'

describe('AddRelationship.vue', async () => {
    let wrapper = createWrapper(AddRelationship)

    it('disables the select field when company.id is empty', async () => {
        let selector = wrapper.find('select')
        expect(Object.values(selector.attributes())).not.toContain('disabled')
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { id: [1, 2] } })
        )
        expect(Object.values(selector.attributes())).toContain('disabled')
    })

    it('disables the select first field', async () => {
        let option = wrapper.findAll('option')
        expect(Object.values(option.at(0).attributes())).toContain('disabled')
    })

    it('shows select fields', async () => {
        const { relationList } = wrapper.vm
        let options = wrapper.findAll('option')
        expect(options.length).toEqual(relationList.length + 1)
        for (let i = 1; i <= options.length - 1; i++) {
            expect(options.at(i).element.value).toBe(relationList[i - 1].name)
        }
    })

    it('invalids input if is submitted and not entered text', async () => {
        let input = wrapper.find('input')
        expect(input.classes()).not.toContain('is-invalid')
        wrapper = await mergeDeep(wrapper, {
            vm: {
                $store: {
                    state: {
                        message: { submitted: true },
                        Company: { company: { name: '' } },
                    },
                },
            },
        })
        expect(input.classes()).toContain('is-invalid')
    })

    it('should be visible when option is selected', async () => {
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { collectionName: '' } })
        )
        let inputFields = wrapper.findAllComponents({
            name: 'input-box-icon',
        })
        expect(inputFields.length).toEqual(1)
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { collectionName: 'companies' } })
        )
        inputFields = wrapper.findAllComponents({
            name: 'input-box-icon',
        })
        expect(inputFields.length > 2).toBeTruthy()
    })

    it('should show correct button text', async () => {
        let button = wrapper.find('.btn')
        expect(button.text()).toBe('Pakeisti')
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { id: [] } })
        )
        expect(button.text()).toBe('Pridėti')
    })

    it('should disable button when select is not selected', async () => {
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { collectionName: '' } })
        )
        let button = wrapper.find('.btn')
        expect(button.attributes().disabled).toBeTruthy()
        wrapper = await mergeDeep(
            wrapper,
            changeState('Company', { company: { collectionName: 'companies' } })
        )
        expect(button.attributes().disabled).toBeFalsy()
    })
})
