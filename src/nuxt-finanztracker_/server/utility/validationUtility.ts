//utility/validationUtility.ts
import { z } from 'zod'
import { IntervalValues } from '../domain/Interval'

// Schema zum Validieren des id-Params in der URL
export const IdParamSchema = z.preprocess((val) => {
  if (val === undefined || val === null) return undefined
  return Number(val)
}, z.number().int().positive())

// Schema zum Validieren des userId-Query-Params
export const QueryUserIdSchema = z.preprocess((val) => {
  if (val === undefined || val === null) return undefined
  return Number(val)
}, z.number().int().positive())

// Hilfsfunktion zum Vorverarbeiten von Datumswerten (Date-Objekt erzeugen)
export const toDatePreprocess = (val: any) => {
  if (val === undefined || val === null) return undefined
  const d = val instanceof Date ? val : new Date(val)
  return d
}

// Interval-Enum (wie in Prisma)
export const IntervalEnum = z.enum(IntervalValues as unknown as [string, ...string[]])