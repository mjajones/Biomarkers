import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import { DateRange, DateRangePreset } from '../types';

export function getPresetRange(preset: DateRangePreset): DateRange {
  const now = new Date();
  switch (preset) {
    case 'today':
      return { start: startOfDay(now), end: endOfDay(now), preset };
    case 'week':
      return { start: startOfDay(subDays(now, 6)), end: endOfDay(now), preset };
    case 'last3months':
      return { start: startOfDay(subDays(now, 30 * 3 - 1)), end: endOfDay(now), preset };
    case 'last6months':
      return { start: startOfDay(subDays(now, 30 * 6 - 1)), end: endOfDay(now), preset };
    case 'lastyear':
      return { start: startOfDay(subDays(now, 365 - 1)), end: endOfDay(now), preset };
    case 'custom':
    default:
      return { start: startOfDay(now), end: endOfDay(now), preset: 'custom' };
  }
}

export function toEpochMsRange(range: DateRange): { startMs: number; endMs: number } {
  return { startMs: range.start.getTime(), endMs: range.end.getTime() };
}
