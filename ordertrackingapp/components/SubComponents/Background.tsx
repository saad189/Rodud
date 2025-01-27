import { theme } from '@/core';
import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    children: ReactNode;
    style?: ViewStyle
};

export default function Background({ children, style }: Props) {
    return (
        <ImageBackground
            // source={require('@/assets/images/app-background-black.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={[style ? style : styles.container]} >
                {children}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
