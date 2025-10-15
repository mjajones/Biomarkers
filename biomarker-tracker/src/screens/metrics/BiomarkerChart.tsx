import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { BiomarkerEntry } from '../../types';

type Props = {
  entries: BiomarkerEntry[];
};

export default function BiomarkerChart({ entries }: Props) {
  const numeric = entries
    .filter((e) => typeof e.valueNum === 'number' && e.valueNum != null)
    .map((e) => ({ x: new Date(e.takenAt), y: e.valueNum as number }))
    .reverse();

  if (numeric.length === 0) return <Text>No numeric data for chart</Text>;

  return (
    <View style={{ height: 200 }}>
      <VictoryChart theme={VictoryTheme.material} scale={{ x: 'time' }} padding={{ left: 48, right: 12, top: 12, bottom: 32 }}>
        <VictoryAxis dependentAxis />
        <VictoryAxis fixLabelOverlap />
        <VictoryLine data={numeric} />
      </VictoryChart>
    </View>
  );
}
