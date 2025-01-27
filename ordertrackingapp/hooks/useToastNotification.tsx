import { Colors } from '@/constants';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-root-toast';

export const useToast = () => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const defaultToastOptions = {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        opacity: 1,
        containerStyle: {
            backgroundColor: colors.notificationInfo,
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 25,

        },
        textStyle: {
            color: colors.textWhite,
        },
    };

    const showInfoMessage = (message: string, options = {}) => {
        Toast.show(message, { ...defaultToastOptions, ...options });
    };

    const showSuccessMessage = (message: string, options = {}) => {
        const successToastOptions = {
            ...defaultToastOptions,
            containerStyle: {
                ...defaultToastOptions.containerStyle,
                backgroundColor: colors.notificationSuccess,
            },
            ...options,
        };
        Toast.show(message, successToastOptions);
    };

    const showErrorMessage = (message: string, options = {}) => {
        const errorToastOptions = {
            ...defaultToastOptions,
            containerStyle: {
                ...defaultToastOptions.containerStyle,
                backgroundColor: colors.notificationError,
            },
            ...options,
        };
        Toast.show(message, errorToastOptions);
    };

    return {
        showInfoMessage,
        showSuccessMessage,
        showErrorMessage,
    };
};