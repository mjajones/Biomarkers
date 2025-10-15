import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

export default function BiomarkerChart({ biomarkerName, records }) {
  if (!records || records.length === 0) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text>No data available for this biomarker</Text>
        </Card.Content>
      </Card>
    );
  }

  // Sort records by date
  const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare chart data
  const labels = sortedRecords.map(record => {
    const date = new Date(record.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const values = sortedRecords.map(record => record.value);

  // Get normal range if available
  const normalRange = sortedRecords[0]?.normalRange;
  const hasNormalRange = normalRange && normalRange.min !== null && normalRange.max !== null;

  const chartData = {
    labels: labels.length > 6 ? labels.filter((_, i) => i % Math.ceil(labels.length / 6) === 0) : labels,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{biomarkerName}</Text>
        {hasNormalRange && (
          <View style={styles.rangeInfo}>
            <Text style={styles.rangeText}>
              Normal Range: {normalRange.min} - {normalRange.max} {sortedRecords[0].unit}
            </Text>
          </View>
        )}
        <LineChart
          data={chartData}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#2196F3',
            },
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Latest</Text>
            <Text style={styles.statValue}>
              {sortedRecords[sortedRecords.length - 1].value} {sortedRecords[sortedRecords.length - 1].unit}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Average</Text>
            <Text style={styles.statValue}>
              {(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)} {sortedRecords[0].unit}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Trend</Text>
            <Text style={[
              styles.statValue,
              values[values.length - 1] > values[0] ? styles.trendUp : styles.trendDown
            ]}>
              {values[values.length - 1] > values[0] ? '↑' : '↓'}
              {' '}
              {Math.abs(values[values.length - 1] - values[0]).toFixed(1)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  rangeInfo: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  rangeText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trendUp: {
    color: '#F44336',
  },
  trendDown: {
    color: '#4CAF50',
  },
});
