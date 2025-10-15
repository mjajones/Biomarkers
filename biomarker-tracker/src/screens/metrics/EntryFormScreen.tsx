import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, List, Menu, Modal, Portal, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BIOMARKERS, searchBiomarkers } from '../../biomarkers/dataset';
import { Biomarker, BiomarkerEntry } from '../../types';
import { insertEntry } from '../../db';
import { format } from 'date-fns';

export default function EntryFormScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [valueNum, setValueNum] = useState<string>('');
  const [valueText, setValueText] = useState<string>('');
  const [takenAt, setTakenAt] = useState<Date>(new Date());
  const [location, setLocation] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [unitsMenuVisible, setUnitsMenuVisible] = useState(false);

  const results = useMemo(() => searchBiomarkers(query, 20), [query]);

  useEffect(() => {
    if (selectedBiomarker && !unit) {
      setUnit(selectedBiomarker.defaultUnit ?? selectedBiomarker.units[0]?.code ?? null);
    }
  }, [selectedBiomarker]);

  const canSave = useMemo(() => {
    if (!selectedBiomarker && !query.trim()) return false;
    if (!unit) return false;
    if (!valueNum && !valueText) return false;
    return true;
  }, [selectedBiomarker, query, unit, valueNum, valueText]);

  const onSave = async () => {
    const entry: BiomarkerEntry = {
      biomarkerCode: selectedBiomarker?.code ?? null,
      biomarkerName: selectedBiomarker?.name ?? query.trim(),
      valueNum: valueNum ? Number(valueNum) : null,
      valueText: valueText || null,
      unit: unit,
      takenAt: takenAt.getTime(),
      location: location || null,
      notes: notes || null,
    };
    await insertEntry(entry);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Entry" />
        <Appbar.Action icon="content-save" disabled={!canSave} onPress={onSave} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          label="Biomarker"
          value={selectedBiomarker ? selectedBiomarker.name : query}
          onChangeText={(t) => {
            setSelectedBiomarker(null);
            setQuery(t);
          }}
          placeholder="Type to search (e.g., weight, glucose)"
          autoCorrect={false}
        />

        {!selectedBiomarker && query.length > 0 && (
          <View style={styles.searchResults}>
            {results.map((b) => (
              <List.Item
                key={b.code}
                title={b.name}
                description={b.aliases?.join(', ')}
                onPress={() => setSelectedBiomarker(b)}
              />
            ))}
          </View>
        )}

        {selectedBiomarker && (
          <List.Section>
            <List.Subheader>Selected: {selectedBiomarker.name}</List.Subheader>
            <Menu
              visible={unitsMenuVisible}
              onDismiss={() => setUnitsMenuVisible(false)}
              anchor={<Button mode="outlined" onPress={() => setUnitsMenuVisible(true)}>{unit ?? 'Select unit'}</Button>}
            >
              {selectedBiomarker.units.map((u) => (
                <Menu.Item key={u.code} title={u.label} onPress={() => { setUnit(u.code); setUnitsMenuVisible(false); }} />
              ))}
            </Menu>
            {selectedBiomarker.referenceRange?.low != null && selectedBiomarker.referenceRange?.high != null && (
              <Text style={{ marginTop: 8 }}>
                Reference: {selectedBiomarker.referenceRange.low}–{selectedBiomarker.referenceRange.high} {selectedBiomarker.referenceRange.unit}
              </Text>
            )}
          </List.Section>
        )}

        <TextInput
          label="Numeric value"
          value={valueNum}
          onChangeText={setValueNum}
          keyboardType="decimal-pad"
        />
        <HelperText type="info">Use either numeric or text (e.g., "120/80").</HelperText>
        <TextInput
          label="Text value"
          value={valueText}
          onChangeText={setValueText}
          placeholder="e.g., 120/80"
        />

        <Button mode="outlined" onPress={() => setDatePickerVisible(true)}>
          {format(takenAt, 'PPpp')}
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={takenAt}
          onConfirm={(date) => { setTakenAt(date); setDatePickerVisible(false); }}
          onCancel={() => setDatePickerVisible(false)}
        />

        <TextInput label="Location" value={location} onChangeText={setLocation} placeholder="e.g., Home, Clinic" />
        <TextInput label="Notes" value={notes} onChangeText={setNotes} multiline />

        <Button mode="contained" disabled={!canSave} onPress={onSave} style={{ marginTop: 16 }}>Save</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  searchResults: {
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    marginTop: 8,
  },
});
