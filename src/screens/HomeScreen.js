import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { biomarkerRecords } = useContext(BiomarkerContext);

  const getTodayRecordsCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return biomarkerRecords.filter(record => 
      record.date.startsWith(today)
    ).length;
  };

  const getThisWeekRecordsCount = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return biomarkerRecords.filter(record => 
      new Date(record.date) >= weekAgo
    ).length;
  };

  const getUniqueBiomarkers = () => {
    return new Set(biomarkerRecords.map(r => r.biomarkerName)).size;
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.headerGradient}
      >
        <Ionicons name="fitness" size={60} color="white" />
        <Title style={styles.headerTitle}>Health Biomarker Tracker</Title>
        <Paragraph style={styles.headerSubtitle}>
          Track your health, one biomarker at a time
        </Paragraph>
      </LinearGradient>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statRow}>
              <Ionicons name="today" size={32} color="#2196F3" />
              <View style={styles.statText}>
                <Title style={styles.statNumber}>{getTodayRecordsCount()}</Title>
                <Paragraph>Records Today</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statRow}>
              <Ionicons name="calendar" size={32} color="#4CAF50" />
              <View style={styles.statText}>
                <Title style={styles.statNumber}>{getThisWeekRecordsCount()}</Title>
                <Paragraph>Records This Week</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statRow}>
              <Ionicons name="pulse" size={32} color="#FF9800" />
              <View style={styles.statText}>
                <Title style={styles.statNumber}>{getUniqueBiomarkers()}</Title>
                <Paragraph>Unique Biomarkers Tracked</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statRow}>
              <Ionicons name="analytics" size={32} color="#9C27B0" />
              <View style={styles.statText}>
                <Title style={styles.statNumber}>{biomarkerRecords.length}</Title>
                <Paragraph>Total Records</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.infoCard]}>
          <Card.Content>
            <Title style={styles.infoTitle}>Welcome!</Title>
            <Paragraph style={styles.infoParagraph}>
              Start tracking your health biomarkers by navigating to the Metrics tab.
              You can add measurements for any health biomarker, view historical data,
              and see trends over time.
            </Paragraph>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Track 100+ biomarkers</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Visual graphs and trends</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Normal range indicators</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Filter by date range</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    padding: 15,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  infoTitle: {
    color: '#2196F3',
    fontSize: 20,
    marginBottom: 10,
  },
  infoParagraph: {
    lineHeight: 22,
    color: '#666',
    marginBottom: 15,
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
