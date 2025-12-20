import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Vue / Nuxt Stubs
config.global.stubs = {
  NuxtLink: true,
  NuxtPage: true,
  ClientOnly: true
}

// Mock: useAlert (Nuxt Composable)
vi.stubGlobal('useAlert', () => ({
  showAlertBox: false,
  alertMessage: '',
  alertType: '',
  showAlert: vi.fn()
}))

// Mock: $fetch (Nuxt global)
export const fetchMock = vi.fn(async () => [])

vi.stubGlobal('$fetch', fetchMock)
