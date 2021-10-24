import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { COLORS } from '../../theme';

// Stylesheet com as regras de estilização
export const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight() + 17, // ajustar status bar de acordo com o tamanho
    flex: 1, // container ocupar a tela toda = flex-grow: 1
    backgroundColor: COLORS.BLACK_SECONDARY,
  },
});
