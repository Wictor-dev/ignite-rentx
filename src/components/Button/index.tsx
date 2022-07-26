import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import { 
    Container,
    Title,
 } from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    color?: string;
}
export function Button({ title, color, ...rest}: Props) {

  const { colors } = useTheme()
  return (
    <Container color={color ? color : colors.main} {...rest} >
        <Title>{title}</Title> 
    </Container>
  ); 
}