import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import Kontobewegung from '../../pages/kontobewegung.vue'

describe('Kontobewegung.vue Neue Ausgabe schließen', () => {
  it('schließt das Ausgabe hinzufügen Overlay', async () => {
    await renderSuspended(Kontobewegung, {
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    // Modal öffnen
    await fireEvent.click(screen.getByText('Ausgabe hinzufügen'))
    expect(screen.getByText('Neue Ausgabe')).toBeTruthy()

    // Modal schließen
    await fireEvent.click(screen.getByText('Abbrechen'))
    expect(screen.queryByText('Neue Ausgabe')).toBeNull()
  })
})
