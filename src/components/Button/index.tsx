import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { 
    Container,
    Title,
 } from './styles';

interface Props {
    title: string;
    color?: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}
export function Button({ 
  title, 
  color, 
  onPress, 
  disabled = false, 
  loading = false
}: Props) {

  const { colors } = useTheme()
  return (
    <Container 
      color={color ? color : colors.main} 
      onPress={onPress}
      disabled={disabled}
      style ={{ opacity: (disabled || loading === true) ? .5 : 1}}

      >
        {loading 
        ? <ActivityIndicator color={colors.shape} />
        :  <Title>{title}</Title> 
        }
    </Container>
  ); 
}