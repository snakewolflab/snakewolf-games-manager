// src/pages/DeveloperModeScreen.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from '../components/Button';

interface DeveloperModeScreenProps {
  navigation: any;
}

export const DeveloperModeScreen: React.FC<DeveloperModeScreenProps> = ({ navigation }) => {
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
      color: theme.colors.modeDeveloper, // デベロッパーモードの識別色
      marginBottom: theme.spacing.lg,
    },
    button: {
      marginTop: theme.spacing.md,
    },
  });

  return (
    <Container style={styles.container}>
      <Text fontSize="h1" style={styles.title}>デベロッパーモード</Text>
      <Text fontSize="large" color={theme.colors.primaryText}>
        開発中のゲーム進捗、バージョン管理、テストビルドのダウンロードが可能です。
      </Text>
      <Button onPress={() => navigation.goBack()} style={styles.button} variant="outline">
        ホームに戻る
      </Button>
      {/* ここにデベロッパー用のコンポーネントを配置 */}
    </Container>
  );
};