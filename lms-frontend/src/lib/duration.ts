/**
 * Formats a duration value (in either minutes or hours) into a user-friendly string (e.g., "18h 30min" or "45min").
 *
 * @param value The duration value
 * @param unit The unit of the duration value ('minutes' or 'hours')
 */
export function formatDuration(value: number, unit: 'minutes' | 'hours' = 'minutes'): string {
  const totalMinutes = unit === 'hours' ? Math.round(value * 60) : value
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}
