import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MetricsScreen from '../../screens/metrics/MetricsScreen';
import EntryFormScreen from '../../screens/metrics/EntryFormScreen';
import BiomarkerDetailScreen from '../../screens/metrics/BiomarkerDetailScreen';

export type MetricsStackParamList = {
  MetricsHome: undefined;
  EntryForm: { entryId?: number } | undefined;
  BiomarkerDetail: { biomarkerCode?: string; biomarkerName: string };
};

const Stack = createNativeStackNavigator<MetricsStackParamList>();

export default function MetricsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MetricsHome" component={MetricsScreen} options={{ title: 'Metrics' }} />
      <Stack.Screen name="EntryForm" component={EntryFormScreen} options={{ title: 'Add Entry' }} />
      <Stack.Screen name="BiomarkerDetail" component={BiomarkerDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}
