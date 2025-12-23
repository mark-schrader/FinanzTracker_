import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Alle Nuxt / globale Komponenten stubben
config.global.stubs = {
  InlineAlert: true,
  CurrentTime: true,
  categoryManager: true,
  bewegungstabelle: true,
  bewegungstabelle_aktion: true,
  NuxtLink: true,
  NuxtPage: true,
  ClientOnly: true
}

// Mock: useAlert
vi.stubGlobal('useAlert', () => ({
  showAlertBox: false,
  alertMessage: '',
  alertType: '',
  showAlert: vi.fn()
}))

// Mock: $fetch
export const fetchMock = vi.fn(async () => [])
vi.stubGlobal('$fetch', fetchMock)

