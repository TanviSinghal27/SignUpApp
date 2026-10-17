import { useRouter, useSegments } from "expo-router";
import { Stack } from "expo-router/stack"; // Pulling Stack directly from its subpath

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation"; // Note: Expo Router v3+ prefers importing from @react-navigation/native

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // Simulated auth state (Replace with your actual auth state/context)
  const isAuthenticated = false;

  // Handle Splash Screen hiding
  useEffect(() => {
    // Simulate asset loading or just let the app mount
    const prepare = async () => {
      try {
        // Add any asset/font loading here if needed
        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, []);

  // Handle Auth Protection Routing
  useEffect(() => {
    if (!isReady) return; // Don't redirect until navigation is ready

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!isAuthenticated && !inAuthGroup) {
      // If not logged in and NOT in the auth screens, force them to register
      router.replace("/(auth)/register" as any);
    } else if (isAuthenticated && !inTabsGroup) {
      // If logged in and NOT in tabs, send them to the home tabs
      router.replace("/(tabs)" as any);
    }
  }, [segments, isAuthenticated, isReady]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        <Stack.Screen
          name="+not-found"
          options={{ headerShown: true, title: "Oops!" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
