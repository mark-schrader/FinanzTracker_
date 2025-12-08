import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import Kontobewegung from '../../pages/kontobewegung.vue'

describe('Kontobewegung.vue', () => {
  it('rendert die Seite', async () => {
    await renderSuspended(Kontobewegung)

    expect(screen.getByText('Kontobewegung')).toBeTruthy()
    expect(screen.getByText('Aktueller Kontostand:')).toBeTruthy()
  })
})
