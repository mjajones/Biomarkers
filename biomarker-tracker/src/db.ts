import * as SQLite from 'expo-sqlite';
import { BiomarkerEntry } from './types';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (database) return database;
  database = await SQLite.openDatabaseAsync('biomarker-tracker.db');
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      biomarkerCode TEXT,
      biomarkerName TEXT NOT NULL,
      valueNum REAL,
      valueText TEXT,
      unit TEXT,
      takenAt INTEGER NOT NULL,
      location TEXT,
      notes TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_entries_takenAt ON entries(takenAt);
    CREATE INDEX IF NOT EXISTS idx_entries_biomarker ON entries(biomarkerCode);
  `);
  return database;
}

export async function insertEntry(entry: BiomarkerEntry): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    `INSERT INTO entries (biomarkerCode, biomarkerName, valueNum, valueText, unit, takenAt, location, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      entry.biomarkerCode ?? null,
      entry.biomarkerName,
      entry.valueNum ?? null,
      entry.valueText ?? null,
      entry.unit ?? null,
      entry.takenAt,
      entry.location ?? null,
      entry.notes ?? null,
    ]
  );
  return result.lastInsertRowId as number;
}

export type QueryFilters = {
  biomarkerCode?: string;
  startMs?: number;
  endMs?: number;
};

export async function queryEntries(filters: QueryFilters = {}): Promise<BiomarkerEntry[]> {
  const db = await getDb();
  const where: string[] = [];
  const params: any[] = [];
  if (filters.biomarkerCode) {
    where.push('biomarkerCode = ?');
    params.push(filters.biomarkerCode);
  }
  if (filters.startMs) {
    where.push('takenAt >= ?');
    params.push(filters.startMs);
  }
  if (filters.endMs) {
    where.push('takenAt <= ?');
    params.push(filters.endMs);
  }
  const sql = `SELECT id, biomarkerCode, biomarkerName, valueNum, valueText, unit, takenAt, location, notes
               FROM entries ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
               ORDER BY takenAt DESC, id DESC`;
  const rows = await db.getAllAsync<any>(sql, params);
  return rows.map((r) => ({
    id: r.id,
    biomarkerCode: r.biomarkerCode ?? null,
    biomarkerName: r.biomarkerName,
    valueNum: r.valueNum ?? null,
    valueText: r.valueText ?? null,
    unit: r.unit ?? null,
    takenAt: r.takenAt,
    location: r.location ?? null,
    notes: r.notes ?? null,
  }));
}

export async function deleteEntry(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM entries WHERE id = ?', [id]);
}

export async function updateEntry(entry: BiomarkerEntry & { id: number }): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `UPDATE entries SET biomarkerCode = ?, biomarkerName = ?, valueNum = ?, valueText = ?, unit = ?, takenAt = ?, location = ?, notes = ? WHERE id = ?`,
    [
      entry.biomarkerCode ?? null,
      entry.biomarkerName,
      entry.valueNum ?? null,
      entry.valueText ?? null,
      entry.unit ?? null,
      entry.takenAt,
      entry.location ?? null,
      entry.notes ?? null,
      entry.id,
    ]
  );
}
