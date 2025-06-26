// src/pages/Home.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from '../components/Text';
import { Container } from '../components/Container';
import { Button } from '../components/Button';

interface HomeScreenProps {
  navigation: any; // React Navigationから渡されるnavigation prop
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleLogout = () => {
    // 実際にはここでログアウトロジックを実行
    console.log('Logging out...');
    // ログアウト後、Login画面へ戻る
    navigation.replace('Login');
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
      color: theme.colors.pastelBlue, // パステルカラーを使用
    },
    button: {
      marginTop: theme.spacing.md,
      width: '60%',
    },
  });

  return (
    <Container style={styles.container}>
      <Text fontSize="h1" style={styles.title}>Home Screen</Text>
      <Text fontSize="large" color={theme.colors.primaryText}>You are logged in!</Text>
      {/* ここにゲーム一覧などのコンテンツを配置 */}
      <Button onPress={handleLogout} style={styles.button} variant="outline">
        Logout
      </Button>
    </Container>
  );
};