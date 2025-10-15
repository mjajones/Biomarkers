import React, { useState, useContext } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Text, Button, Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { BIOMARKERS } from '../data/biomarkers';
import { Ionicons } from '@expo/vector-icons';

export default function AddBiomarkerModal({ visible, onDismiss }) {
  const { addBiomarkerRecord } = useContext(BiomarkerContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBiomarker, setSelectedBiomarker] = useState(null);
  const [value, setValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredBiomarkers = BIOMARKERS.filter(biomarker =>
    biomarker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBiomarkerSelect = (biomarker) => {
    setSelectedBiomarker(biomarker);
    setSearchQuery(biomarker.name);
    setSelectedUnit(biomarker.units[0]);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (!selectedBiomarker || !value || !date) {
      alert('Please fill in all required fields');
      return;
    }

    const record = {
      biomarkerName: selectedBiomarker.name,
      value: parseFloat(value),
      unit: selectedUnit,
      date: date,
      location: location,
      notes: notes,
      normalRange: selectedBiomarker.normalRange,
      category: selectedBiomarker.category,
    };

    addBiomarkerRecord(record);
    resetForm();
    onDismiss();
  };

  const resetForm = () => {
    setSearchQuery('');
    setSelectedBiomarker(null);
    setValue('');
    setSelectedUnit('');
    setDate(new Date().toISOString().split('T')[0]);
    setLocation('');
    setNotes('');
    setShowSuggestions(false);
  };

  const handleCancel = () => {
    resetForm();
    onDismiss();
  };

  const isInNormalRange = () => {
    if (!selectedBiomarker || !value) return null;
    const numValue = parseFloat(value);
    const { min, max } = selectedBiomarker.normalRange;
    if (min === null || max === null) return null;
    return numValue >= min && numValue <= max;
  };

  const rangeStatus = isInNormalRange();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Biomarker</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Biomarker Search */}
          <View style={styles.section}>
            <Text style={styles.label}>Biomarker *</Text>
            <Searchbar
              placeholder="Search biomarkers..."
              onChangeText={(text) => {
                setSearchQuery(text);
                setShowSuggestions(true);
              }}
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              style={styles.searchBar}
            />
            {showSuggestions && searchQuery && (
              <ScrollView style={styles.suggestionsContainer} nestedScrollEnabled>
                {filteredBiomarkers.slice(0, 10).map((biomarker, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => handleBiomarkerSelect(biomarker)}
                  >
                    <View>
                      <Text style={styles.suggestionName}>{biomarker.name}</Text>
                      <Text style={styles.suggestionCategory}>{biomarker.category}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Value Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Value *</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              keyboardType="decimal-pad"
              placeholder="Enter value"
            />
          </View>

          {/* Unit Picker */}
          {selectedBiomarker && (
            <View style={styles.section}>
              <Text style={styles.label}>Unit *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedUnit}
                  onValueChange={(itemValue) => setSelectedUnit(itemValue)}
                  style={styles.picker}
                >
                  {selectedBiomarker.units.map((unit, index) => (
                    <Picker.Item key={index} label={unit} value={unit} />
                  ))}
                </Picker>
              </View>
            </View>
          )}

          {/* Normal Range Indicator */}
          {selectedBiomarker && value && selectedBiomarker.normalRange.min !== null && (
            <View style={styles.section}>
              <View style={[
                styles.rangeIndicator,
                rangeStatus === true ? styles.rangeNormal :
                rangeStatus === false ? styles.rangeAbnormal : {}
              ]}>
                <Ionicons
                  name={rangeStatus ? "checkmark-circle" : "warning"}
                  size={20}
                  color={rangeStatus ? "#4CAF50" : "#FF5722"}
                />
                <Text style={styles.rangeText}>
                  {rangeStatus ? 'Within normal range' : 'Outside normal range'}
                </Text>
              </View>
              <Text style={styles.rangeDetails}>
                Normal range: {selectedBiomarker.normalRange.min} - {selectedBiomarker.normalRange.max} {selectedUnit}
              </Text>
            </View>
          )}

          {/* Date Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Date *</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>

          {/* Location Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g., Home, Doctor's office, Lab"
            />
          </View>

          {/* Notes Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              labelStyle={styles.submitButtonText}
            >
              Save Biomarker
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  searchBar: {
    elevation: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  suggestionsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  suggestionCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  rangeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  rangeNormal: {
    backgroundColor: '#E8F5E9',
  },
  rangeAbnormal: {
    backgroundColor: '#FFEBEE',
  },
  rangeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  rangeDetails: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
