import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import Kontobewegung from '../../pages/kontobewegung.vue'

describe('Kontobewegung.vue Einnahme hinzufügen', () => {
  it('öffnet das Einnahme hinzufügen Overlay', async () => {
    await renderSuspended(Kontobewegung)

    // Button finden
    const btn = screen.getByText('Einnahme hinzufügen')
    expect(btn).toBeTruthy()

    // klicken
    await fireEvent.click(btn)

    // Modal erscheint
    expect(screen.getByText('Neue Einnahme')).toBeTruthy()
  })
})
