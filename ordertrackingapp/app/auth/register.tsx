
import Background from '@/components/SubComponents/Background';
import Button from '@/components/SubComponents/Button';
import Logo from '@/components/SubComponents/Logo';
import PasswordField from '@/components/SubComponents/PasswordField';
import TextInput from '@/components/SubComponents/TextInput';
import { ROUTE_NAMES } from '@/constants';
import { theme } from '@/core';
import { emailValidator, nameValidator, passwordValidator } from '@/helpers';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
    navigation: any;
};

export default function RegisterScreen() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [name, setName] = useState<{ value: string; error: string }>({ value: '', error: '' });
    const [email, setEmail] = useState<{ value: string; error: string }>({ value: '', error: '' });
    const [password, setPassword] = useState<{ value: string; error: string }>({ value: '', error: '' });

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }
        // We will add auth update here
        navigation.navigate(ROUTE_NAMES.AUTH.LOGIN);
    };

    return (
        <Background>
            {/* <BackButton goBack={navigation.goBack} /> */}
            <Logo isWhite={true} />
            <Text style={styles.titleText}>Hello!</Text>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text: any) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text: any) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <PasswordField
                placeholder="Password"
                value={password.value}
                onChangeText={(text: any) => setPassword({ value: text, error: '' })}
                onSubmitEditing={onSignUpPressed}
            />
            <Button mode="contained" onPress={onSignUpPressed} style={styles.button}>
                Sign Up
            </Button>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.replace(ROUTE_NAMES.AUTH.LOGIN)}>
                    <Text style={{ color: theme.colors.primary }}>Already have an account?
                        <Text style={styles.link}> Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginTop: 24
    },
    titleText: {
        fontSize: 24,
        fontWeight: "600"
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.secondary,
    },
});
