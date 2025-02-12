/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textWhite: 'white',
    buttonBackgroundColor: '#FF6F61',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    notificationSuccess: '#D4EDDA',
    notificationInfo: '#a09af5',
    notificationError: '#f02e3f',
  },
  dark: {
    text: '#ECEDEE',
    buttonBackgroundColor: '#FF6F61',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    textWhite: 'white',
    tabIconDefault: '#9BA1A6',
    notificationSuccess: '#155724',
    notificationInfo: '#253fcf',
    tabIconSelected: tintColorDark,
    notificationError: '#721C24',
  },
};
