import { describe, it, expect, vi, beforeEach } from 'vitest'
import CategoryService from '../../../server/application/CategoryService'
import { CategoryRepository } from '../../../server/repositories/CategoryRepository'

// Repository komplett mocken
vi.mock('../../../server/repositories/CategoryRepository')

describe('Backend Unit: CategoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('liefert Kategorien für einen User zurück', async () => {
    
    const mockCategories = [
      { id: 1, name: 'Wohnen', type: 'expense' },
      { id: 2, name: 'Lebensmittel', type: 'expense' }
    ]

    vi.spyOn(CategoryRepository.prototype, 'findByUserId')
      .mockResolvedValue(mockCategories as any)

    const result = await CategoryService.getCategoryByUserId(1)

    expect(result).toEqual([
      {
        id: 1,
        name: 'Wohnen',
        type: 'expense',
        icon: undefined,
        color: undefined
      },
      {
        id: 2,
        name: 'Lebensmittel',
        type: 'expense',
        icon: undefined,
        color: undefined
      }
    ])

    it('liefert eine leere Liste zurück, wenn keine Kategorien existieren', async () => {
      vi.spyOn(CategoryRepository.prototype, 'findByUserId')
        .mockResolvedValue([] as any)

      const result = await CategoryService.getCategoryByUserId(1)

      expect(result).toEqual([])
    })
  })
})