// domain/Interval.ts
export const IntervalValues = ['once', 'weekly', 'monthly', 'semesterly', 'annual'] as const
export type Interval = typeof IntervalValues[number]
export const DEFAULT_INTERVAL: Interval = 'once'

export default {
  IntervalValues,
  DEFAULT_INTERVAL
}
