import { describe, it, vi, expect, beforeEach } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'

// Die Page importieren (wenn sie "index.vue" heißt → '../pages/index.vue')
import Kontobewegung from '~/pages/kontobewegung.vue'

// --- API Mock ---
beforeEach(() => {
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

    if (url === '/api/incomes') {
      return Promise.resolve({ success: true })
    }

    if (url === '/api/expenses') {
      return Promise.resolve({ success: true })
    }

    return Promise.resolve([])
  }))
})

describe('Kontobewegung Page', () => {

  it('rendert die Seite', async () => {
    await renderSuspended(Kontobewegung)

    expect(screen.getByText('Kontobewegung')).toBeDefined()
    expect(screen.getByText('Aktueller Kontostand:')).toBeDefined()
  })

  it('öffnet das Einnahme-Modal und speichert eine Einnahme', async () => {
    await renderSuspended(Kontobewegung)

    // Button finden
    const incomeBtn = screen.getByText('Einnahme hinzufügen')
    expect(incomeBtn).toBeDefined()

    // Modal öffnen
    await fireEvent.click(incomeBtn)

    // Felder existieren?
    expect(screen.getByText('Neue Einnahme')).toBeDefined()

    const amountInput = screen.getByLabelText('Betrag (€)')
    const dateInput = screen.getByLabelText('Datum')
    const sourceInput = screen.getByLabelText('Quelle')

    // User gibt Werte ein
    await fireEvent.update(amountInput, '1500')
    await fireEvent.update(dateInput, '2025-01-01')
    await fireEvent.update(sourceInput, 'Job')

    // Speichern drücken
    const saveBtn = screen.getByText('Speichern')
    await fireEvent.click(saveBtn)

    // Neue Transaktion sollte sichtbar sein
    expect(await screen.findByText('+1500.00 €')).toBeDefined()
  })
})
