import { vi } from 'vitest'

// GLOBALER $fetch MOCK FÜR ALLE TESTS
vi.stubGlobal('$fetch', vi.fn((url: string) => {
  if (url.includes('/api/categories')) {
    return Promise.resolve([
      { id: 1, type: 'income', name: 'Gehalt' },
      { id: 2, type: 'expense', name: 'Miete' },
    ])
  }

  if (url.includes('/api/transactions')) {
    return Promise.resolve([])
  }

  return Promise.resolve([])
}))
