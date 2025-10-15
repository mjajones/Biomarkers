import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, IconButton, Chip } from 'react-native-paper';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { Ionicons } from '@expo/vector-icons';

export default function BiomarkerList({ records }) {
  const { deleteBiomarkerRecord } = useContext(BiomarkerContext);

  const handleDelete = (id, biomarkerName) => {
    Alert.alert(
      'Delete Record',
      `Are you sure you want to delete this ${biomarkerName} record?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteBiomarkerRecord(id),
        },
      ]
    );
  };

  const isInNormalRange = (record) => {
    const { value, normalRange } = record;
    if (!normalRange || normalRange.min === null || normalRange.max === null) {
      return null;
    }
    return value >= normalRange.min && value <= normalRange.max;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Sort records by date (most recent first)
  const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <View style={styles.container}>
      {sortedRecords.map((record) => {
        const inRange = isInNormalRange(record);
        return (
          <Card key={record.id} style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Title style={styles.biomarkerName}>{record.biomarkerName}</Title>
                  <Chip
                    mode="outlined"
                    style={styles.categoryChip}
                    textStyle={styles.categoryText}
                  >
                    {record.category}
                  </Chip>
                </View>
                <IconButton
                  icon="trash-outline"
                  iconColor="#F44336"
                  size={20}
                  onPress={() => handleDelete(record.id, record.biomarkerName)}
                />
              </View>

              <View style={styles.valueContainer}>
                <View style={styles.mainValue}>
                  <Title style={styles.value}>
                    {record.value} <Text style={styles.unit}>{record.unit}</Text>
                  </Title>
                  {inRange !== null && (
                    <View style={[
                      styles.rangeIndicator,
                      inRange ? styles.rangeNormal : styles.rangeAbnormal
                    ]}>
                      <Ionicons
                        name={inRange ? "checkmark-circle" : "warning"}
                        size={16}
                        color={inRange ? "#4CAF50" : "#FF5722"}
                      />
                      <Paragraph style={[
                        styles.rangeText,
                        inRange ? styles.rangeNormalText : styles.rangeAbnormalText
                      ]}>
                        {inRange ? 'Normal' : 'Abnormal'}
                      </Paragraph>
                    </View>
                  )}
                </View>

                {inRange !== null && (
                  <Paragraph style={styles.normalRange}>
                    Normal: {record.normalRange.min} - {record.normalRange.max} {record.unit}
                  </Paragraph>
                )}
              </View>

              <View style={styles.metadata}>
                <View style={styles.metadataItem}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Paragraph style={styles.metadataText}>{formatDate(record.date)}</Paragraph>
                </View>
                {record.location && (
                  <View style={styles.metadataItem}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Paragraph style={styles.metadataText}>{record.location}</Paragraph>
                  </View>
                )}
              </View>

              {record.notes && (
                <View style={styles.notesContainer}>
                  <Ionicons name="document-text-outline" size={16} color="#666" />
                  <Paragraph style={styles.notes}>{record.notes}</Paragraph>
                </View>
              )}
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  biomarkerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    height: 24,
    marginTop: 4,
  },
  categoryText: {
    fontSize: 11,
    marginVertical: 0,
  },
  valueContainer: {
    marginBottom: 12,
  },
  mainValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  unit: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'normal',
  },
  rangeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rangeNormal: {
    backgroundColor: '#E8F5E9',
  },
  rangeAbnormal: {
    backgroundColor: '#FFEBEE',
  },
  rangeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  rangeNormalText: {
    color: '#4CAF50',
  },
  rangeAbnormalText: {
    color: '#FF5722',
  },
  normalRange: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metadataText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  notes: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
});
