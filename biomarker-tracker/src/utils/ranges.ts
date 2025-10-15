import { BIOMARKER_INDEX } from '../biomarkers/dataset';

export function isInRange(biomarkerCode: string | null | undefined, value: number | null | undefined, unit: string | null | undefined): boolean | null {
  if (!biomarkerCode || value == null) return null;
  const b = BIOMARKER_INDEX[biomarkerCode];
  if (!b || !b.referenceRange) return null;
  const { low, high, unit: rangeUnit } = b.referenceRange;
  // For now, assume same unit; future: convert units
  if (rangeUnit && unit && rangeUnit !== unit) return null;
  if (low != null && value < low) return false;
  if (high != null && value > high) return false;
  return true;
}
