import React, { useState, forwardRef, memo } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextInput from '@/components/SubComponents/TextInput';
type Props = TextInputProps & {
    value: string;
    onChangeText: (text: string) => void;
}

const PasswordField = (({ value, onChangeText, onSubmitEditing }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                label="Password"
                placeholder="Password"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!showPassword}
                onSubmitEditing={onSubmitEditing}
                returnKeyType="done"
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.peekButton}>
                <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin: 20,
        fontSize: 16
    },
    inputPassword: {
        flex: 1
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        width: '100%'
    },
    peekButton: {
        position: 'absolute',
        right: 15,
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(PasswordField);
