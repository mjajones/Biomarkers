import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Button, Chip, FAB, List, SegmentedButtons, Portal, Modal, Text } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { queryEntries } from '../../db';
import { BiomarkerEntry, DateRangePreset } from '../../types';
import { getPresetRange, toEpochMsRange } from '../../utils/dateRanges';
import { format } from 'date-fns';
import { isInRange } from '../../utils/ranges';

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
  const [customVisible, setCustomVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date>(range.start);
  const [endDate, setEndDate] = useState<Date>(range.end);
  const [whichPicker, setWhichPicker] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    const load = async () => {
      const effectiveRange = preset === 'custom' ? { start: startDate, end: endDate, preset: 'custom' as const } : range;
      const { startMs, endMs } = toEpochMsRange(effectiveRange);
      const rows = await queryEntries({ startMs, endMs });
      setEntries(rows);
    };
    load();
  }, [range, preset, startDate, endDate]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Metrics" />
        <Appbar.Action icon="calendar" onPress={() => setCustomVisible(true)} />
      </Appbar.Header>

      <View style={styles.presetRow}>
        <SegmentedButtons
          value={preset}
          onValueChange={(v: DateRangePreset) => setPreset(v)}
          buttons={PRESETS.map((p) => ({ label: p.label, value: p.value }))}
        />
      </View>

      <Portal>
        <Modal visible={customVisible} onDismiss={() => setCustomVisible(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleMedium">Custom Date Range</Text>
          <Button onPress={() => setWhichPicker('start')}>Start: {format(startDate, 'PP p')}</Button>
          <Button onPress={() => setWhichPicker('end')}>End: {format(endDate, 'PP p')}</Button>
          <View style={{ height: 8 }} />
          <Button
            mode="contained"
            onPress={() => {
              setPreset('custom');
              setCustomVisible(false);
            }}
          >
            Apply
          </Button>
        </Modal>
      </Portal>

      <DateTimePickerModal
        isVisible={whichPicker !== null}
        mode="datetime"
        date={whichPicker === 'start' ? startDate : endDate}
        onConfirm={(d) => {
          if (whichPicker === 'start') setStartDate(d);
          if (whichPicker === 'end') setEndDate(d);
          setWhichPicker(null);
        }}
        onCancel={() => setWhichPicker(null)}
      />

      <FlatList
        data={entries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const inRange = isInRange(item.biomarkerCode ?? null, item.valueNum ?? null, item.unit ?? null);
          const leftIcon = inRange == null ? undefined : (props: any) => (
            <List.Icon {...props} icon={inRange ? 'check-circle' : 'alert-circle'} color={inRange ? 'green' : 'orange'} />
          );
          return (
            <List.Item
              title={`${item.biomarkerName}${item.unit ? ` (${item.unit})` : ''}`}
              description={`${item.valueText ?? item.valueNum ?? ''} • ${format(new Date(item.takenAt), 'PP p')}`}
              onPress={() =>
                navigation.navigate('BiomarkerDetail', {
                  biomarkerCode: item.biomarkerCode ?? undefined,
                  biomarkerName: item.biomarkerName,
                })
              }
              left={leftIcon}
            />
          );
        }}
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
