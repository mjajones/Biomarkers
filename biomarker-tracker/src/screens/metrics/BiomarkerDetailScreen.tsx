import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { queryEntries } from '../../db';
import { BiomarkerEntry } from '../../types';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryVoronoiContainer } from 'victory-native';
import { format } from 'date-fns';

export type BiomarkerDetailParams = {
  code: string;
  name: string;
  unit?: string | null;
};

export default function BiomarkerDetailScreen() {
  const route = useRoute<RouteProp<Record<string, BiomarkerDetailParams>, string>>();
  const { code, name, unit } = route.params as BiomarkerDetailParams;
  const [entries, setEntries] = useState<BiomarkerEntry[]>([]);

  useEffect(() => {
    const load = async () => {
      const rows = await queryEntries({ biomarkerCode: code });
      setEntries(rows.reverse()); // chronological for charts
    };
    load();
  }, [code]);

  const numericPoints = useMemo(() =>
    entries
      .filter((e) => typeof e.valueNum === 'number' && !isNaN(e.valueNum as number))
      .map((e) => ({ x: new Date(e.takenAt), y: e.valueNum as number })),
  [entries]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title={name} />
      </Appbar.Header>
      <View style={styles.content}>
        {numericPoints.length > 0 ? (
          <VictoryChart
            width={Dimensions.get('window').width - 16}
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryAxis tickFormat={(t) => format(new Date(t), 'MM/dd')} />
            <VictoryAxis dependentAxis tickFormat={(t) => `${t}`} label={unit ?? ''} />
            <VictoryLine data={numericPoints} />
            <VictoryScatter data={numericPoints} size={3} />
          </VictoryChart>
        ) : (
          <Text style={{ padding: 16 }}>No numeric data to chart.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 8 },
});
