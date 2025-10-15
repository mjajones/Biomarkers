import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, FAB, Chip, Card, Title, Paragraph } from 'react-native-paper';
import { BiomarkerContext } from '../context/BiomarkerContext';
import AddBiomarkerModal from '../components/AddBiomarkerModal';
import BiomarkerChart from '../components/BiomarkerChart';
import BiomarkerList from '../components/BiomarkerList';
import { Ionicons } from '@expo/vector-icons';

export default function MetricsScreen() {
  const { biomarkerRecords } = useContext(BiomarkerContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedBiomarker, setSelectedBiomarker] = useState(null);

  const dateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'Week', value: 'week' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: 'Year', value: 'year' },
    { label: 'All', value: 'all' },
  ];

  const getFilteredRecords = () => {
    const now = new Date();
    let startDate = new Date(0); // Beginning of time

    switch (selectedDateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case '3months':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6months':
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return biomarkerRecords;
    }

    return biomarkerRecords.filter(record => new Date(record.date) >= startDate);
  };

  const filteredRecords = getFilteredRecords();

  const uniqueBiomarkers = [...new Set(filteredRecords.map(r => r.biomarkerName))].sort();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Date Range Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Date Range</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
            {dateRanges.map(range => (
              <Chip
                key={range.value}
                selected={selectedDateRange === range.value}
                onPress={() => setSelectedDateRange(range.value)}
                style={styles.chip}
                selectedColor="#fff"
                mode={selectedDateRange === range.value ? 'flat' : 'outlined'}
                textStyle={selectedDateRange === range.value ? styles.selectedChipText : {}}
              >
                {range.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="document-text" size={24} color="#2196F3" />
                <Title style={styles.statNumber}>{filteredRecords.length}</Title>
                <Paragraph style={styles.statLabel}>Records</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="pulse" size={24} color="#4CAF50" />
                <Title style={styles.statNumber}>{uniqueBiomarkers.length}</Title>
                <Paragraph style={styles.statLabel}>Biomarkers</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Biomarker Selection for Chart */}
        {uniqueBiomarkers.length > 0 && (
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Biomarker Trends</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.biomarkerChipContainer}>
              {uniqueBiomarkers.map(biomarker => (
                <Chip
                  key={biomarker}
                  selected={selectedBiomarker === biomarker}
                  onPress={() => setSelectedBiomarker(biomarker)}
                  style={styles.chip}
                  selectedColor="#fff"
                  mode={selectedBiomarker === biomarker ? 'flat' : 'outlined'}
                  textStyle={selectedBiomarker === biomarker ? styles.selectedChipText : {}}
                >
                  {biomarker}
                </Chip>
              ))}
            </ScrollView>

            {selectedBiomarker && (
              <BiomarkerChart
                biomarkerName={selectedBiomarker}
                records={filteredRecords.filter(r => r.biomarkerName === selectedBiomarker)}
              />
            )}
          </View>
        )}

        {/* Records List */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>All Records</Text>
          {filteredRecords.length > 0 ? (
            <BiomarkerList records={filteredRecords} />
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Ionicons name="clipboard-outline" size={48} color="#ccc" style={styles.emptyIcon} />
                <Paragraph style={styles.emptyText}>No records found for this date range</Paragraph>
                <Paragraph style={styles.emptySubtext}>
                  Tap the + button to add your first biomarker measurement
                </Paragraph>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        color="white"
      />

      <AddBiomarkerModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  filterSection: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chipContainer: {
    flexDirection: 'row',
  },
  biomarkerChipContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  chip: {
    marginRight: 8,
  },
  selectedChipText: {
    color: 'white',
  },
  statsCard: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartSection: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  listSection: {
    padding: 15,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  emptyCard: {
    padding: 20,
    alignItems: 'center',
  },
  emptyIcon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});
