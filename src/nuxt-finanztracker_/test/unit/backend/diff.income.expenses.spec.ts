// src/nuxt-finanztracker_/test/unit/backend/getAllTransactions.spec.ts
// Unit tests for TransactionService.getAllTransactions to verify combined fetching of incomes and expenses
import { describe, it, expect, vi, afterEach } from 'vitest'

import TransactionService from '../../../server/application/TransactionService'
import ExpenseService from '../../../server/application/ExpenseService'
import IncomeService from '../../../server/application/IncomeService'
import Expense from '../../../server/domain/Expense'
import Income from '../../../server/domain/Income'

describe('Backend Unit: Diff zwischen Einnahmen und Ausgaben', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('liefert kombinierte Daten, aus denen der Diff (Saldo) berechnet werden kann', async () => {
		const userId = 7
		const date = new Date('2025-05-01T00:00:00Z')

		const expenses = [
			new Expense(1, userId, 10, 'Miete', 700, date, 'monthly', undefined, { username: 'Alex' }, { id: 10, name: 'Wohnen' }),
			new Expense(2, userId, 12, 'Versicherung', 100, date, 'monthly', undefined, { username: 'Alex' }, { id: 12, name: 'Versicherung' })
		]

		const incomes = [
			new Income(3, userId, 11, 'Gehalt', 1500, date, 'monthly', undefined, { username: 'Alex' }, { id: 11, name: 'Einkommen' })
		]

		vi.spyOn(ExpenseService, 'getExpensesByUserId').mockResolvedValue(expenses as any)
		vi.spyOn(IncomeService, 'getIncomesByUserId').mockResolvedValue(incomes as any)

		const result = await TransactionService.getAllTransactions(userId)

		// Alle Beträge enthalten Vorzeichen, damit der Diff (Saldo) direkt ableitbar ist
		expect(result.map(r => r.amount)).toEqual(expect.arrayContaining(['-700.00 €', '-100.00 €', '+1500.00 €']))

		// Diff (Saldo) berechnen: Einnahmen - Ausgaben
		const diff = result.reduce((sum, entry) => {
			const numeric = parseFloat(entry.amount.replace(/[^0-9+-.]/g, ''))
			return sum + numeric
		}, 0)

		expect(diff).toBeCloseTo(700) // 1500 - 700 - 100
	})
})
