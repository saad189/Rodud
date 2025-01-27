import { theme } from '@/core';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';


type Props = {
    mode: 'text' | 'outlined' | 'contained';
    style?: ViewStyle;
} & Omit<PaperButtonProps, 'mode'>;

export default function Button({ mode, style, ...props }: Props) {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: theme.colors.surface },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        width: 'auto',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 5,
        backgroundColor: theme.colors.buttonTheme
    },
    text: {
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 20,
    },
});
