// src/pages/Login.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from '../components/Text';
import { Container } from '../components/Container';
import { Button } from '../components/Button';

interface LoginScreenProps {
  navigation: any; // React Navigationから渡されるnavigation prop
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleLogin = () => {
    // 実際にはここで認証ロジックを実行
    console.log('Login attempt...');
    // 認証成功後、Home画面へ遷移
    navigation.replace('Home'); // replaceを使うと戻るボタンでログイン画面に戻れなくなる
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    title: {
      marginBottom: theme.spacing.xl,
      color: theme.colors.pastelOrange, // パステルカラーを使用
    },
    button: {
      marginTop: theme.spacing.md,
      width: '80%',
    },
  });

  return (
    <Container style={styles.container}>
      <Text fontSize="h1" style={styles.title}>Welcome Back!</Text>
      {/* ここにログインフォーム（Inputコンポーネントなど）を追加 */}
      <Button onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </Container>
  );
};