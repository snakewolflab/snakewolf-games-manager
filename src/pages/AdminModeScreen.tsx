// src/pages/AdminModeScreen.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from '../components/Button';

interface AdminModeScreenProps {
  navigation: any;
}

export const AdminModeScreen: React.FC<AdminModeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    title: {
      color: theme.colors.modeAdmin, // 管理者モードの識別色
      marginBottom: theme.spacing.lg,
    },
    button: {
      marginTop: theme.spacing.md,
    },
  });

  return (
    <Container style={styles.container}>
      <Text fontSize="h1" style={styles.title}>管理者モード</Text>
      <Text fontSize="large" color={theme.colors.primaryText}>
        全てのゲーム情報のCRUD操作とユーザー管理、システム設定が可能です。
      </Text>
      <Button onPress={() => navigation.goBack()} style={styles.button} variant="outline">
        ホームに戻る
      </Button>
      {/* ここに管理者用のコンポーネントを配置 */}
    </Container>
  );
};