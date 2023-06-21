import { shallowMount } from '@vue/test-utils'
import storeActions from './storeActions'
import { vi } from 'vitest'
import VueRouter from 'vue-router'
import Vue from 'vue'


export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return mergeDeep(target, ...sources)
}

function createWrapper(page, overrides) {
    const defaultMountingOptions = {
        mocks: {
            $axios: {
                get: () => {
                    return new Promise((resolve) => resolve({}))
                },
                put: () => Promise.resolve({}),
                post: () => Promise.resolve({}),
            },
            $store: storeActions,
            $router: {
                push: () => { }
            }
        },
        stubs: ['router-link', 'router-view'],
        propsData: {},
    }
    return shallowMount(page, mergeDeep(defaultMountingOptions, overrides))
}

export default createWrapper
