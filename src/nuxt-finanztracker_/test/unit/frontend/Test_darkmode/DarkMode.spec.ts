/// <reference lib="dom" />
// src/nuxt-finanztracker_/test/unit/frontend/Test_darkmode/DarkMode.spec.ts
// Frontend Unit Test – Dark-Mode-Funktionalität

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DarkMode from '../../../../components/darkMode.vue'

describe('Unit: Dark & Light Mode', () => {
  beforeEach(() => {
    // Mock Nuxt client environment
    vi.stubGlobal('process', { client: true })

    // Reset den DOM-Status und localStorage vor jedem Test
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  it('der Toggle-Button ist sichtbar und erreichbar', () => {
    const wrapper = mount(DarkMode)
    const checkbox = wrapper.find('input[type="checkbox"]')

    expect(checkbox.exists()).toBe(true) // Überprüfe, ob das Toggle-Element existiert
  })


  it('schaltet von Light Mode zu Dark Mode', async () => {
    const wrapper = mount(DarkMode) //
    const checkbox = wrapper.find('input[type="checkbox"]') // Finde das Checkbox-Element

    // Light Mode default
    expect(document.documentElement.classList.contains('dark')).toBe(false) // Bestätige Light Mode ist aktiv

    // Dark Mode aktivieren
    await checkbox.setValue(true) 
    await wrapper.vm.$nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(true) // Bestätige Dark Mode ist aktiv
    expect(localStorage.getItem('theme')).toBe('dark') // Bestätige localStorage Eintrag
  })


  it('schaltet von Dark Mode zu Light Mode', async () => {
    const wrapper = mount(DarkMode)
    const checkbox = wrapper.find('input[type="checkbox"]') // Finde das Checkbox-Element

    // Setze initialen Zustand auf Dark Mode
    await checkbox.setValue(true)
    await wrapper.vm.$nextTick() //
    expect(document.documentElement.classList.contains('dark')).toBe(true) // Bestätige Dark Mode ist aktiv

    // Wechsle zu Light Mode
    await checkbox.setValue(false)
    await wrapper.vm.$nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(false) // Bestätige Light Mode ist aktiv
    expect(localStorage.getItem('theme')).toBe('light') // Bestätige localStorage Eintrag
  })
})