import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import Kontobewegung from '../../pages/kontobewegung.vue'

beforeEach(() => {
  // --- GLOBALES FETCH-MOCK ---
  vi.stubGlobal('$fetch', vi.fn((url: string) => {
    if (url.includes('/api/categories')) {
      return Promise.resolve([
        { id: 1, type: 'income', name: 'Gehalt' },
        { id: 2, type: 'expense', name: 'Miete' }
      ])
    }

    if (url.includes('/api/transactions')) {
      return Promise.resolve([])
    }

    return Promise.resolve([])
  }))
})

describe('Kontobewegung.vue Einnahme hinzufügen', () => {
  it('schließt das Einnahme hinzufügen Overlay', async () => {
    await renderSuspended(Kontobewegung, {
      global: {
        // NuxtLink stubs → verhindert Routing-Warnungen
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    // Modal öffnen
    await fireEvent.click(screen.getByText('Einnahme hinzufügen'))
    expect(screen.getByText('Neue Einnahme')).toBeTruthy()

    // Modal schließen
    await fireEvent.click(screen.getByText('Abbrechen'))
    expect(screen.queryByText('Neue Einnahme')).toBeNull()
  })
})
