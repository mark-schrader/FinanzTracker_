// src/nuxt-finanztracker_/test/utils/mountWithSuspense.ts
// Utility function to mount a Vue component with Suspense for testing purposes

import { mount } from '@vue/test-utils'
import { h, Suspense } from 'vue'

export async function mountWithSuspense(component: any, options: any = {}) {
  let wrapper: any

  wrapper = mount({
    render() {
      return h(Suspense, {}, {
        default: h(component, options.props || {})
      })
    }
  }, options)

  // warten bis Suspense aufgelöst ist
  await new Promise(resolve => setTimeout(resolve, 0))

  return wrapper
}
