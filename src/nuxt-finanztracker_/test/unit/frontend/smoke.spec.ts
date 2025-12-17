import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

const Comp = {
  template: `<button @click="count++">{{ count }}</button>`,
  data: () => ({ count: 0 })
}

describe('frontend unit smoke', () => {
  it('increments', async () => {
    const wrapper = mount(Comp)
    await wrapper.trigger('click')
    expect(wrapper.text()).toBe('1')
  })
})
