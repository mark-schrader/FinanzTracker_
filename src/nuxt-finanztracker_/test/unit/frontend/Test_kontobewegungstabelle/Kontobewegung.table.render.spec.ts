// test/unit/frontend/Test_kontobewegungstabelle/Kontobewegung.table.render.spec.ts
// Unit Test – Kontobewegung Tabelle Anzeige, suchenn, editieren, löschen
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Bewegungstabelle from '../../../../components/bewegungstabelle.vue'

// Mock-Daten für Kontobewegungen
describe('Unit: Bewegungstabelle – Tabelle Anzeige', () => {
    const mockTransactions = [
        {
            id: 1,
            date: '2023-01-01',
            amount: '100.00 €',
            type: 'Einnahme',
            interval: 'monthly',
            owner: 'John Doe',
            purpose: 'Salary',
            categoryName: 'Income',
            comment: 'Monthly salary'
        },
        {
            id: 2,
            date: '2023-01-02',
            amount: '50.00 €',
            type: 'Ausgabe',
            interval: 'once',
            owner: 'Jane Doe',
            purpose: 'Groceries',
            categoryName: 'Food',
            comment: 'Weekly groceries'
        }
    ]


    it('rendert die Tabelle mit Transaktionen', () => { // Überprüfe das Rendern der Tabelle
        const wrapper = mount(Bewegungstabelle, {
            props: { transactions: mockTransactions }
        })

        // Überprüfe, ob die Tabelle vorhanden ist
        expect(wrapper.find('table').exists()).toBe(true)

        // Überprüfe die Tabellenüberschriften
        const headers = wrapper.findAll('th')
        expect(headers).toHaveLength(8) // Datum, Betrag, Intervall, Inhaber, Zweck, Kategorie, Kommentar, Aktionen

        // Überprüfe, ob die Transaktionen angezeigt werden
        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(2)

    })

    it('filtert Transaktionen basierend auf Suchbegriff', async () => {
        const wrapper = mount(Bewegungstabelle, {
            props: { transactions: mockTransactions }
        })

        // Zuerst beide Transaktionen sichtbar
        expect(wrapper.findAll('tbody tr')).toHaveLength(2)

        // Suche nach 'Salary'
        const searchInput = wrapper.find('input[type="text"]')
        await searchInput.setValue('Salary')

        // Nur eine Transaktion sollte sichtbar sein
        expect(wrapper.findAll('tbody tr')).toHaveLength(1)
        expect(wrapper.text()).toContain('Salary')

        // Suche nach etwas, das nicht existiert
        await searchInput.setValue('Nonexistent')
        expect(wrapper.findAll('tbody tr')).toHaveLength(0)
    })

    it('emittiert "edit" Event beim Klick auf Bearbeiten Button', async () => { // Überprüfe das Edit-Event
        const wrapper = mount(Bewegungstabelle, {
            props: { transactions: mockTransactions }
        })

        const editButton = wrapper.findAll('button').find(btn => btn.find('i.fas.fa-pen').exists()) // Überprüfe, ob der Bearbeiten-Button existiert
        expect(editButton).toBeDefined()
        await editButton!.trigger('click')

        const editEmitted = wrapper.emitted('edit') // Überprüfe, ob das Edit-Event emittiert wurde
        expect(editEmitted).toBeTruthy()
        expect(editEmitted![0]).toEqual([mockTransactions[0]])
    })

    it('emittiert "delete" Event beim Klick auf Löschen Button', async () => { // Überprüfe das Delete-Event
        const wrapper = mount(Bewegungstabelle, {
            props: { transactions: mockTransactions }
        })

        const deleteButton = wrapper.findAll('button').find(btn => btn.find('i.fas.fa-trash').exists()) // Überprüfe, ob der Löschen-Button existiert
        expect(deleteButton).toBeDefined()
        await deleteButton!.trigger('click')

        const deleteEmitted = wrapper.emitted('delete')
        expect(deleteEmitted).toBeTruthy()
        expect(deleteEmitted![0]).toEqual([mockTransactions[0].id])
    })
})
