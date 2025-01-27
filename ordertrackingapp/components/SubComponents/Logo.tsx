import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo({ isWhite }: { isWhite?: boolean }) {
    const location = isWhite
        ? require('@/assets/images/icon.png')
        : require('@/assets/images/icon.png');


    return <Image source={location} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '25%',
        resizeMode: 'contain',
        marginBottom: 8,
    },
});
