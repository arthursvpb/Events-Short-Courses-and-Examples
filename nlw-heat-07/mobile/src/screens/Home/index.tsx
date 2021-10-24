import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/Header';

import { styles } from './styles';

export function Home() {
  return (
    // View => Equivalente às divs
    <View style={styles.container}>
      <Header />
    </View>
  );
}
