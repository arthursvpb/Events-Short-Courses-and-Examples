import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ColorValue,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

// Estender tipagem do botão
// TouchableOpacityProps e o que definimos de forma customizável
type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  // Props de um ícone dinâmico usando AntDesign
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
};

export function Button({
  title,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {/* Travar o botão se estiver enviandoa alguma requisição, e carregar um efeito de loading */}
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[styles.title, { color }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
