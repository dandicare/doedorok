import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { HeaderBackButton } from '@/components/header-back-button';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="parent/morning-checkin"
            options={{
              headerShown: true,
              title: '모닝 체크인',
              headerLeft: () => <HeaderBackButton />,
              presentation: 'card',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="parent/after-meal-checkin"
            options={{
              headerShown: true,
              title: '식사 후 체크인',
              headerLeft: () => <HeaderBackButton />,
              presentation: 'card',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="student/profile"
            options={{
              headerShown: true,
              title: '학생 프로필',
              headerLeft: () => <HeaderBackButton />,
              presentation: 'card',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="teacher/students"
            options={{
              headerShown: true,
              title: '내가 맡는 아이들',
              headerLeft: () => <HeaderBackButton />,
              presentation: 'card',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="example"
            options={{
              headerShown: true,
              title: 'Example',
              presentation: 'card',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
