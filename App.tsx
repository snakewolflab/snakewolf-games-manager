// App.tsx
import 'react-native-gesture-handler'; // React Navigationを使用する場合、エントリポイントの最初にインポート

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider'; // 作成したテーマプロバイダーをインポート
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ページコンポーネントをインポート
import { LoginScreen } from './src/pages/Login';
import { HomeScreen } from './src/pages/Home';

// Stack Navigator を作成
const Stack = createNativeStackNavigator();

const ThemedAppContent: React.FC = () => {
  const theme = useTheme();

  return (
    // NavigationContainer でアプリ全体をラップ
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryBackground} />
      <Stack.Navigator
        initialRouteName="Login" // アプリ起動時に最初に表示する画面
        screenOptions={{
          headerShown: false, // 各画面のヘッダーを非表示にする（カスタムヘッダーを実装する場合）
          contentStyle: {
            backgroundColor: theme.colors.primaryBackground, // 画面背景色をテーマから取得
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* 他の画面もここに追加 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedAppContent />
    </ThemeProvider>
  );
}