import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ThemeProvider } from './theme';
import { checkAndRescheduleIfNeeded } from '../services/notificationService';

export default function RootLayout() {
  useEffect(() => {
    checkAndRescheduleIfNeeded();
  }, []);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
