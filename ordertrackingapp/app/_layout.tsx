import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useColorScheme } from '@/hooks/useColorScheme';

import { LoaderProvider } from '@/hooks';
import { ROUTE_NAMES } from '@/constants';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Stacks() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen
        name={ROUTE_NAMES.AUTH.REGISTER}
        options={{
          headerShown: false,
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.AUTH.LOGIN}
        options={{
          headerShown: false,
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_left'
        }}
      />
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_left'
        }}
      />
    </Stack>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootSiblingParent>
        <LoaderProvider>
          <Stacks />
        </LoaderProvider>
      </RootSiblingParent>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
