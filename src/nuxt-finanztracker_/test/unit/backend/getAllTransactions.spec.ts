// src/nuxt-finanztracker_/test/unit/backend/getAllTransactions.spec.ts
// Unit tests for TransactionService.getAllTransactions to verify combined fetching of incomes and expenses
import { describe, it, expect, vi, afterEach } from 'vitest'

import TransactionService from '../../../server/application/TransactionService'
import ExpenseService from '../../../server/application/ExpenseService'
import IncomeService from '../../../server/application/IncomeService'
import Expense from '../../../server/domain/Expense'
import Income from '../../../server/domain/Income'

describe('Backend Unit: TransactionService.getAllTransactions', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('verrechnet monatliche Einnahmen und Ausgaben vorab, indem sie gemeinsam geliefert werden', async () => {
		const userId = 42
		const txDate = new Date('2025-06-01T00:00:00Z')

		const monthlyExpense = new Expense(
			1,
			userId,
			10,
			'Miete',
			800,
			txDate,
			'monthly',
			undefined,
			{ username: 'Max Mustermann' },
			{ id: 10, name: 'Wohnen' }
		)

		const monthlyIncome = new Income(
			2,
			userId,
			11,
			'Gehalt',
			1200,
			txDate,
			'monthly',
			undefined,
			{ username: 'Max Mustermann' },
			{ id: 11, name: 'Einkommen' }
		)

		const expenseSpy = vi
			.spyOn(ExpenseService, 'getExpensesByUserId')
			.mockResolvedValue([monthlyExpense] as any)

		const incomeSpy = vi
			.spyOn(IncomeService, 'getIncomesByUserId')
			.mockResolvedValue([monthlyIncome] as any)

		const result = await TransactionService.getAllTransactions(userId)

		expect(expenseSpy).toHaveBeenCalledWith(userId)
		expect(incomeSpy).toHaveBeenCalledWith(userId)
		expect(result).toHaveLength(2)

		const incomeEntry = result.find(r => r.type === 'Einnahme')
		const expenseEntry = result.find(r => r.type === 'Ausgabe')

		expect(incomeEntry).toMatchObject({
			interval: 'monthly',
			amount: '+1200.00 €',
			categoryName: 'Einkommen'
		})

		expect(expenseEntry).toMatchObject({
			interval: 'monthly',
			amount: '-800.00 €',
			categoryName: 'Wohnen'
		})

		// Netto-Saldo des Monats aus den gelieferten Buchungen
		const netMonthly = result.reduce((sum, entry) => {
			const numeric = parseFloat(entry.amount.replace(/[^0-9+-.]/g, ''))
			return sum + numeric
		}, 0)

		expect(netMonthly).toBeCloseTo(400)
	})
})

