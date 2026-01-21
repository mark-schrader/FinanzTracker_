// test/unit/frontend/Test_Kategorie/categoryManager.Category.popup.open.spec.ts
// Frontend Unit Test – Kategorie Popup öffnen
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CategoryManager from '../../../../components/categoryManager.vue'

describe('Kategorie Popup', () => {
  it('öffnet das Kategorie-Popup zum Anlegen neuer Kategorien', async () => {
    const wrapper = mount(CategoryManager)

    // Button "Kategorien verwalten"
    const manageButton = wrapper
      .findAll('button')
      .find(b => b.text().includes('Kategorien verwalten'))

    expect(manageButton).toBeTruthy()
    await manageButton!.trigger('click')

    // Add-Button visible
    const addButton = wrapper.find('[data-testid="open-category-popup"]')
    expect(addButton.exists()).toBe(true)

    await addButton.trigger('click')

    // Popup visible (DOM-based, stable way)
    expect(wrapper.text()).toContain('Neue Kategorie')
  })
})
