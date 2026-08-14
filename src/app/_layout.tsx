import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
const [fontsLoaded, fontError] = useFonts({
  'SFProText-Regular': require('../../assets/fonts/SFProText-Regular.ttf'),
  'SFProText-Medium': require('../../assets/fonts/SFProText-Medium.ttf'),
  'SFProText-Bold': require('../../assets/fonts/SFProText-Bold.ttf'),
});
  useEffect(() => {
    if (fontError) {
      // কনসোলে প্রিন্ট হবে আসল ঝামেলা কোথায় (পাথ বা ফাইল ড্যামেজ কি না)
      console.error('Font Loading Error:', fontError);
    }
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(protected)" />
      </Stack>
    </>
  );
}