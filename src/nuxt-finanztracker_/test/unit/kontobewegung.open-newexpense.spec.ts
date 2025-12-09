import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import Kontobewegung from '../../pages/kontobewegung.vue'

describe('Kontobewegung.vue Ausgabe hinzufügen', () => {
  it('öffnet das Ausgabe hinzufügen Overlay', async () => {
    await renderSuspended(Kontobewegung, {
      global: {
        // verhindert Router-Warnungen durch NuxtLink
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    // Button "Ausgabe hinzufügen" klicken
    const btn = screen.getByText('Ausgabe hinzufügen')
    expect(btn).toBeTruthy()

    await fireEvent.click(btn)

    // Overlay-Titel "Neue Ausgabe" sollte sichtbar sein
    expect(screen.getByText('Neue Ausgabe')).toBeTruthy()
  })
})
