import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Button, Chip, FAB, List, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { queryEntries } from '../../db';
import { BiomarkerEntry, DateRangePreset } from '../../types';
import { getPresetRange, toEpochMsRange } from '../../utils/dateRanges';
import { format } from 'date-fns';

const PRESETS: { label: string; value: DateRangePreset }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: '3 mo', value: 'last3months' },
  { label: '6 mo', value: 'last6months' },
  { label: 'Year', value: 'lastyear' },
];

export default function MetricsScreen() {
  const navigation = useNavigation<any>();
  const [preset, setPreset] = useState<DateRangePreset>('week');
  const range = useMemo(() => getPresetRange(preset), [preset]);
  const [entries, setEntries] = useState<BiomarkerEntry[]>([]);

  useEffect(() => {
    const load = async () => {
      const { startMs, endMs } = toEpochMsRange(range);
      const rows = await queryEntries({ startMs, endMs });
      setEntries(rows);
    };
    load();
  }, [range]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Metrics" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.presetRow}>
        <SegmentedButtons
          value={preset}
          onValueChange={(v: DateRangePreset) => setPreset(v)}
          buttons={PRESETS.map((p) => ({ label: p.label, value: p.value }))}
        />
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.biomarkerName}${item.unit ? ` (${item.unit})` : ''}`}
            description={`${item.valueText ?? item.valueNum ?? ''} • ${format(new Date(item.takenAt), 'PP p')}`}
            onPress={() =>
              navigation.navigate('BiomarkerDetail', {
                biomarkerCode: item.biomarkerCode ?? undefined,
                biomarkerName: item.biomarkerName,
              })
            }
          />
        )}
        ListEmptyComponent={<List.Item title="No entries yet" description="Tap + to add" />}
        contentContainerStyle={{ paddingBottom: 96 }}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('EntryForm')}
        testID="addEntryFab"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  presetRow: { padding: 12 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
});
