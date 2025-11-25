// utils/transactionFormatUtils.ts

export function formatAmount(amount: number, type: 'income' | 'expense'): string {
  const sign = type === 'income' ? '+' : '-'
  return `${sign}${amount.toFixed(2)} €`
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}