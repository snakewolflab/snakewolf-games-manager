// App.tsx
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './src/pages/Login';
import { HomeScreen } from './src/pages/Home'; // Home画面がメインとなる
import { AuthProvider } from './src/contexts/AuthContext'; // AuthProviderをインポート
import { AdminModeScreen } from './src/pages/AdminModeScreen';
import { DeveloperModeScreen } from './src/pages/DeveloperModeScreen';
import { InternalModeScreen } from './src/pages/InternalModeScreen';


const Stack = createNativeStackNavigator();

const ThemedAppContent: React.FC = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryBackground} />
      <Stack.Navigator
        initialRouteName="/" // ★変更: アプリ起動時に最初に表示する画面をHomeに変更
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.primaryBackground,
          },
        }}
      >
        <Stack.Screen name="/" component={HomeScreen} />
        <Stack.Screen name="/login" component={LoginScreen} />
        {/* 各モードの画面をスタックに追加 */}
        <Stack.Screen name="AdminModeScreen" component={AdminModeScreen} />
        <Stack.Screen name="DeveloperModeScreen" component={DeveloperModeScreen} />
        <Stack.Screen name="InternalModeScreen" component={InternalModeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}