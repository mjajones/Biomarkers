import { Biomarker } from '../types';

// This is a starter subset. We will expand over time.
// Include common vitals and labs; allow aliases and default units.
export const BIOMARKERS: Biomarker[] = [
  {
    code: 'weight',
    name: 'Weight',
    units: [
      { code: 'kg', label: 'kg' },
      { code: 'lb', label: 'lb' },
    ],
    defaultUnit: 'kg',
    referenceRange: { low: 40, high: 200, unit: 'kg' },
    aliases: ['body weight', 'mass'],
  },
  {
    code: 'height',
    name: 'Height',
    units: [
      { code: 'cm', label: 'cm' },
      { code: 'in', label: 'in' },
    ],
    defaultUnit: 'cm',
    referenceRange: { low: 120, high: 220, unit: 'cm' },
    aliases: ['stature'],
  },
  {
    code: 'hr_rest',
    name: 'Resting Heart Rate',
    units: [{ code: 'bpm', label: 'bpm' }],
    defaultUnit: 'bpm',
    referenceRange: { low: 40, high: 100, unit: 'bpm' },
    aliases: ['RHR'],
  },
  {
    code: 'spo2',
    name: 'Blood Oxygen Saturation',
    units: [{ code: '%', label: '%' }],
    defaultUnit: '%',
    referenceRange: { low: 95, high: 100, unit: '%' },
    aliases: ['Pulse ox', 'SpO2'],
  },
  {
    code: 'temp',
    name: 'Body Temperature',
    units: [
      { code: 'C', label: '°C' },
      { code: 'F', label: '°F' },
    ],
    defaultUnit: 'C',
    referenceRange: { low: 36.1, high: 37.2, unit: 'C' },
    aliases: ['Temperature', 'Body temp'],
  },
  {
    code: 'bp_systolic',
    name: 'Blood Pressure Systolic',
    units: [{ code: 'mmHg', label: 'mmHg' }],
    defaultUnit: 'mmHg',
    referenceRange: { low: 90, high: 120, unit: 'mmHg' },
    aliases: ['SBP'],
  },
  {
    code: 'bp_diastolic',
    name: 'Blood Pressure Diastolic',
    units: [{ code: 'mmHg', label: 'mmHg' }],
    defaultUnit: 'mmHg',
    referenceRange: { low: 60, high: 80, unit: 'mmHg' },
    aliases: ['DBP'],
  },
  {
    code: 'glucose',
    name: 'Blood Glucose',
    units: [
      { code: 'mg/dL', label: 'mg/dL' },
      { code: 'mmol/L', label: 'mmol/L' },
    ],
    defaultUnit: 'mg/dL',
    referenceRange: { low: 70, high: 99, unit: 'mg/dL', note: 'fasting' },
    aliases: ['BG', 'glucose fasting'],
  },
  {
    code: 'hba1c',
    name: 'Hemoglobin A1c',
    units: [{ code: '%', label: '%' }],
    defaultUnit: '%',
    referenceRange: { low: 4.0, high: 5.6, unit: '%' },
    aliases: ['A1c'],
  },
  {
    code: 'bmi',
    name: 'Body Mass Index',
    units: [{ code: 'kg/m^2', label: 'kg/m^2' }],
    defaultUnit: 'kg/m^2',
    referenceRange: { low: 18.5, high: 24.9, unit: 'kg/m^2' },
    aliases: [],
  },
];

export const BIOMARKER_INDEX: Record<string, Biomarker> = Object.fromEntries(
  BIOMARKERS.map((b) => [b.code, b])
);

export function searchBiomarkers(query: string, limit = 20): Biomarker[] {
  const q = query.trim().toLowerCase();
  if (!q) return BIOMARKERS.slice(0, limit);
  const results = BIOMARKERS.filter((b) => {
    if (b.name.toLowerCase().includes(q)) return true;
    if (b.code.toLowerCase().includes(q)) return true;
    if (b.aliases?.some((a) => a.toLowerCase().includes(q))) return true;
    return false;
  });
  return results.slice(0, limit);
}
