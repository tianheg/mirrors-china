import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders title properly', () => {
    const wrapper = mount(App)
    const title = wrapper.find('.title')
    expect(title.text()).toBe('Mirrors China')
  })
})
