// test/setup.frontend.ts
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

/* Global Component Stubs*/
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

/* useAlert Mock */
vi.stubGlobal('useAlert', () => ({
  showAlertBox: false,
  alertMessage: '',
  alertType: '',
  showAlert: vi.fn()
}))

  /* $fetch Mock */
export const fetchMock = vi.fn(async () => ({}))
vi.stubGlobal('$fetch', fetchMock)

/* definePageMeta (Nuxt) */
vi.stubGlobal('definePageMeta', () => {})

/* Nuxt Composables */
vi.mock('#app', () => {
  return {
    useFetch: vi.fn(() => ({
      data: {
        value: [
          { id: 1, name: 'Lebensmittel', type: 'expense' },
          { id: 2, name: 'Miete', type: 'expense' },
          { id: 3, name: 'Gehalt', type: 'income' }
        ]
      },
      pending: { value: false },
      error: { value: null }
    })),
    useAsyncData: vi.fn(() => ({
      data: { value: [] },
      pending: { value: false },
      error: { value: null }
    })),
    navigateTo: vi.fn()
  }
})

// Mock Supabase User
vi.stubGlobal('useSupabaseUser', async () => ({
  value: {
    id: 'test-user',
    email: 'test@test.de'
  }
}))