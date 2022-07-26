import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { BorderlessButtonProps } from 'react-native-gesture-handler'

import { useTheme } from 'styled-components';

import { Container } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props extends TouchableOpacityProps {
    color?: string;
}
export function BackButton({ color, ...rest }: Props) {
    const navigation = useNavigation()
    const { colors } = useTheme()

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <Container onPress={handleGoBack} {...rest}>
            <MaterialIcons
                name="chevron-left"
                size={24}
                color={color ? color : colors.text}
            />
        </Container>
    );
}