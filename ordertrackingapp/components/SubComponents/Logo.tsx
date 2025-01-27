import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo({ isWhite }: { isWhite?: boolean }) {
    const location = isWhite
        ? 'https://cdn.prod.website-files.com/662c95fd6e0e4feedf85ad95/66a0ea28b3a5b0b1130329a6_WLenghtRodudLogo-p-500.png'
        : 'https://cdn.prod.website-files.com/662c95fd6e0e4feedf85ad95/6641b0ea5a0e51161080324b_3%20(1)-p-500.png';


    return <Image source={{ uri: location }} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '25%',
        resizeMode: 'contain',
        marginBottom: 8,
    },
});
