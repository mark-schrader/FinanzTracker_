// test/unit/frontend/Category.popup.open.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CategoryManager from '../../../components/categoryManager.vue'

describe('Kategorie Popup', () => {
  it('öffnet das Kategorie-Popup zum Anlegen neuer Kategorien', async () => {
    const wrapper = mount(CategoryManager)

    // Haupt-Modal öffnen (Kategorien verwalten)
    const manageButton = wrapper
      .findAll('button')
      .find(b => b.text().includes('Kategorien verwalten'))

    expect(manageButton).toBeTruthy()
    await manageButton!.trigger('click')

    await wrapper.vm.$nextTick()

    // Jetzt existiert der Add-Button
    const openAddButton = wrapper.find('[data-testid="open-category-popup"]')
    expect(openAddButton.exists()).toBe(true)

    // Add-Modal öffnen
    await openAddButton.trigger('click')
    await wrapper.vm.$nextTick()

    // Add-Modal ist sichtbar
    expect(wrapper.html()).toContain('Neue Kategorie')
  })
})
