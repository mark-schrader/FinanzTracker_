// src/nuxt-finanztracker_/test/unit/backend/refreshbugetafterinput.spec.ts
// Backend Unit Test – Budget wird nach jedem Eintrag neu berechnet
import { describe, it, expect, vi, afterEach } from 'vitest'
import TransactionService from '../../../server/application/TransactionService'
import ExpenseService from '../../../server/application/ExpenseService'
import IncomeService from '../../../server/application/IncomeService'
import Expense from '../../../server/domain/Expense'
import Income from '../../../server/domain/Income'

describe('Backend Unit: Budget wird nach jedem Eintrag neu berechnet', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('aktualisiert den verfügbaren Betrag nach neuer Ausgabe oder Einnahme', async () => {
		const userId = 9
		const date = new Date('2025-07-01T00:00:00Z')

		const initialExpenses = [
			new Expense(1, userId, 21, 'Miete', 500, date, 'once', undefined, { username: 'Lee' }, { id: 21, name: 'Wohnen' })
		]

		const initialIncomes = [
			new Income(2, userId, 22, 'Gehalt', 2000, date, 'once', undefined, { username: 'Lee' }, { id: 22, name: 'Einkommen' })
		]

		const updatedExpenses = [
			...initialExpenses,
			new Expense(3, userId, 23, 'Lebensmittel', 300, date, 'once', undefined, { username: 'Lee' }, { id: 23, name: 'Lebensmittel' })
		]

		const updatedIncomes = [...initialIncomes]

		vi.spyOn(ExpenseService, 'getExpensesByUserId')
			.mockResolvedValueOnce(initialExpenses as any)
			.mockResolvedValueOnce(updatedExpenses as any)

		vi.spyOn(IncomeService, 'getIncomesByUserId')
			.mockResolvedValueOnce(initialIncomes as any)
			.mockResolvedValueOnce(updatedIncomes as any)

		// Erster Abruf: Budget vor neuer Buchung
		const firstResult = await TransactionService.getAllTransactions(userId)
		const firstBudget = firstResult.reduce((sum, entry) => {
			const numeric = parseFloat(entry.amount.replace(/[^0-9+-.]/g, ''))
			return sum + numeric
		}, 0)

		expect(firstBudget).toBeCloseTo(1500) // 2000 - 500

		// Zweiter Abruf: Nach neuer Ausgabe -> Budget muss neu berechnet sein
		const secondResult = await TransactionService.getAllTransactions(userId)
		const secondBudget = secondResult.reduce((sum, entry) => {
			const numeric = parseFloat(entry.amount.replace(/[^0-9+-.]/g, ''))
			return sum + numeric
		}, 0)

		expect(secondBudget).toBeCloseTo(1200) // 2000 - 500 - 300
		expect(secondBudget).toBeLessThan(firstBudget)
	})
})
