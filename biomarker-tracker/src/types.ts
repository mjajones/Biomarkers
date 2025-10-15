export type UnitOption = {
  code: string; // e.g., kg, lb, bpm, mmHg
  label: string;
};

export type ReferenceRange = {
  low?: number | null;
  high?: number | null;
  unit?: string | null;
  note?: string | null;
};

export type Biomarker = {
  code: string; // unique key, e.g., weight, bp_systolic
  name: string; // display name
  units: UnitOption[];
  defaultUnit?: string;
  referenceRange?: ReferenceRange; // generic range if applicable
  aliases?: string[];
};

export type BiomarkerEntry = {
  id?: number;
  biomarkerCode?: string | null; // may be null for custom/free-form
  biomarkerName: string; // captured at entry time for resiliency
  valueNum?: number | null;
  valueText?: string | null; // e.g., "120/80" or qualitative
  unit?: string | null;
  takenAt: number; // epoch ms
  location?: string | null;
  notes?: string | null;
};

export type DateRangePreset =
  | "today"
  | "week"
  | "last3months"
  | "last6months"
  | "lastyear"
  | "custom";

export type DateRange = {
  start: Date;
  end: Date;
  preset: DateRangePreset;
};
