// src/pages/InternalModeScreen.tsx
import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { useTheme } from '../theme/ThemeProvider';
import { Button } from '../components/Button';

interface InternalModeScreenProps {
  navigation: any;
}

export const InternalModeScreen: React.FC<InternalModeScreenProps> = ({ navigation }) => {
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
      color: theme.colors.modeInternal, // 社内モードの識別色
      marginBottom: theme.spacing.lg,
    },
    button: {
      marginTop: theme.spacing.md,
    },
    linkButton: {
      backgroundColor: theme.colors.pastelYellow, // Google Sitesへのリンクは目立つ色で
      marginVertical: theme.spacing.sm,
      width: '80%',
    },
    linkText: {
      color: theme.colors.primaryBackground, // 背景とコントラストを強く
    }
  });

  // Google SitesへのURLはダミーです。実際のものに置き換えてください。
  const GOOGLE_SITES_URL = 'https://sites.google.com/view/snakewolf-internal-portal';

  const openGoogleSite = async () => {
    const supported = await Linking.canOpenURL(GOOGLE_SITES_URL);
    if (supported) {
      await Linking.openURL(GOOGLE_SITES_URL);
    } else {
      alert(`Google Sitesを開けません: ${GOOGLE_SITES_URL}`);
    }
  };

  return (
    <Container style={styles.container}>
      <Text fontSize="h1" style={styles.title}>社内モード</Text>
      <Text fontSize="large" color={theme.colors.primaryText}>
        Google Analyticsデータへのアクセスや社内資料の閲覧が可能です。
      </Text>
      <Button onPress={openGoogleSite} style={styles.linkButton} textStyle={styles.linkText}>
        Google Sitesへ移動
      </Button>
      <Button onPress={() => navigation.goBack()} style={styles.button} variant="outline">
        ホームに戻る
      </Button>
      {/* ここに社内用のコンポーネントを配置 */}
    </Container>
  );
};