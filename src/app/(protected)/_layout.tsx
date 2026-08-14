import { Redirect, Stack } from "expo-router";

import { Text } from "react-native";
export default function ProtectedLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Text>login kor</Text>;
  }

  return (<Stack screenOptions={{ headerShown: false }} 
  
      >
        
      </Stack>)
}
