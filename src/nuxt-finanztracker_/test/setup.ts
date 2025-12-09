import { vi } from 'vitest'

/* --- WICHTIG: Route Rules + Pages Plugin deaktivieren --- */
vi.mock('#internal/nuxt/manifest', () => ({
  appManifest: { routes: [], dynamicRoutes: [], prerendered: [] }
}))

vi.mock('#build/pages', () => ({
  default: []
}))

/* --- Router Mock --- */
vi.mock('#app', async () => {
  const actual = await vi.importActual<any>('#app')
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      currentRoute: { value: { path: '/' } },
    }),
    useRoute: () => ({
      path: '/',
      fullPath: '/',
      query: {},
      params: {},
    }),
  }
})

/* --- NuxtLink Mock --- */
vi.mock('#components', () => ({
  NuxtLink: {
    template: '<a><slot/></a>'
  }
}))

/* --- $fetch Mocken --- */
vi.stubGlobal('$fetch', vi.fn((url: string) => {
  if (url.startsWith('/api/categories')) {
    return Promise.resolve([
      { id: 1, type: 'income', name: 'Gehalt' },
      { id: 2, type: 'expense', name: 'Miete' }
    ])
  }

  if (url.startsWith('/api/transactions')) {
    return Promise.resolve([])
  }

  if (url === '/api/incomes') return Promise.resolve({ success: true })
  if (url === '/api/expenses') return Promise.resolve({ success: true })

  return Promise.resolve([])
}))
