import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { emailValidator, passwordValidator } from '@/helpers';
import Background from '@/components/SubComponents/Background';
import { StackNavigationProp } from '@react-navigation/stack';
import Logo from '@/components/SubComponents/Logo';

import TextInput from '@/components/SubComponents/TextInput';
import Button from '@/components/SubComponents/Button';
import { theme } from '@/core';
import { ROUTE_NAMES } from '@/constants';
import { useNavigation } from 'expo-router';
import { ParamListBase } from '@react-navigation/native';

import PasswordField from '@/components/SubComponents/PasswordField';
// import { useToast } from '../../hooks/useToastNotification';
import { useLoader } from '@/hooks';


export default function LoginScreen() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [email, setEmail] = useState<{ value: string; error: string }>({ value: 'saad18910@hotmail.com', error: '' });
    const [password, setPassword] = useState<{ value: string; error: string }>({ value: 's', error: '' });

    // const { showSuccessMessage, showErrorMessage } = useToast();

    const { setLoading } = useLoader();

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        handleLogin();
    };

    const handleLogin = async () => {
        console.log({ email, password })
        try {
            Keyboard.dismiss();
            setLoading(true);
            // const isValidUser = await authService.loginUser(loginInfo);

            // if (isValidUser) {
            //     rememberUserCredentials({ loginInfo: rememberMe ? loginInfo : emptyLoginInfo, rememberMe });
            onSuccessfulLogin(email.value);
            // }
        } catch (error) {
            //   showErrorMessage((error as Error).message); // Custom messages for Sanitization check
        } finally {
            setLoading(false);
        }
    }

    const onSuccessfulLogin = (email: string) => {
        navigation.reset({
            index: 0,
            routes: [{ name: ROUTE_NAMES.TABS.self }],
        });

        navigation.navigate(ROUTE_NAMES.TABS.self);
        // showSuccessMessage(`Logged In as ${email}`, {
        //     textStyle: {
        //         fontSize: 14
        //     }
        // });

    };
    return (
        <Background>
            <Logo />
            <Text style={styles.titleText}>Welcome back!</Text>
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
            {/* <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text: any) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            /> */}
            <PasswordField
                placeholder="Password"
                value={password.value}
                onChangeText={(text: any) => setPassword({ value: text, error: '' })}
                onSubmitEditing={onLoginPressed}
            />

            <Button style={styles.button} mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.replace(ROUTE_NAMES.AUTH.REGISTER)}>
                    <Text style={{ color: theme.colors.primary }}>Don’t have an account?
                        <Text style={styles.link}> Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%'
    },
    titleText: {
        fontSize: 24,
        fontWeight: "600"
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
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
