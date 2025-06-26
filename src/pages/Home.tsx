// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from '../components/Text';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext'; // AuthContextをインポート
import { AdminModeScreen } from './AdminModeScreen';
import { DeveloperModeScreen } from './DeveloperModeScreen';
import { InternalModeScreen } from './InternalModeScreen';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { isAuthenticated, userRole, logout } = useAuth(); // AuthContextから状態と関数を取得

  // アプリ起動時（またはHome画面表示時）に認証状態をチェックし、必要ならログイン画面へ遷移
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('/login'); // 未認証ならログイン画面へ
    }
  }, [isAuthenticated, navigation]);

  const handleLogout = () => {
    logout(); // ログアウト処理
  };

  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.primaryBackground,
    },
    header: {
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primaryText + '33', // 半透明の線
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      color: theme.colors.primaryText,
    },
    roleText: {
      color: theme.colors.pastelYellow, // ロール表示にパステルカラー
      marginLeft: theme.spacing.sm,
    },
    contentContainer: {
      flexGrow: 1, // ScrollView内でコンテンツが伸びるように
      padding: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
      color: theme.colors.pastelGreen,
    },
    modeButton: {
      marginVertical: theme.spacing.sm,
      width: '80%',
      // ロールごとの色をボタンに適用
      backgroundColor: userRole === 'admin' ? theme.colors.modeAdmin :
                      userRole === 'developer' ? theme.colors.modeDeveloper :
                      userRole === 'internal' ? theme.colors.modeInternal :
                      theme.colors.modeNormal,
    },
    // 各モード画面への遷移ボタンの色を調整
    adminButton: { backgroundColor: theme.colors.modeAdmin },
    devButton: { backgroundColor: theme.colors.modeDeveloper },
    internalButton: { backgroundColor: theme.colors.modeInternal },
  });

  if (!isAuthenticated) {
    return null; // 認証されるまで何も表示しないか、ローディングスピナーを表示
  }

  return (
    <Container style={styles.screenContainer}>
      {/* カスタムヘッダー */}
      <Container style={styles.header}>
        <Text fontSize="h2" style={styles.headerTitle}>SnakeWolf Portal</Text>
        <Text fontSize="medium" style={styles.roleText}>
          Mode: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </Text>
        <Button onPress={handleLogout} variant="text" textStyle={{color: theme.colors.pastelRed}}>
          ログアウト
        </Button>
      </Container>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 通常者モードのコンテンツ */}
        {userRole === 'normal' && (
          <>
            <Text fontSize="h1" style={styles.sectionTitle}>リリース済みゲーム</Text>
            <Text fontSize="large" color={theme.colors.primaryText}>
              ここにリリース済みのゲーム情報一覧が表示されます。
            </Text>
            <Button onPress={() => alert('ゲーム詳細へ')} style={styles.modeButton}>
              ゲームを見る (通常者)
            </Button>
          </>
        )}

        {/* 社内モードのコンテンツ（通常者もアクセス可能） */}
        {(userRole === 'normal' || userRole === 'internal' || userRole === 'developer' || userRole === 'admin') && (
          <>
            <Text fontSize="h2" style={styles.sectionTitle}>社内情報</Text>
            {userRole !== 'normal' && ( // 通常者モード以外ならボタンを表示
                <Button onPress={() => navigation.navigate('InternalModeScreen')} style={[styles.modeButton, styles.internalButton]}>
                    社内ポータルへ (Google Sites)
                </Button>
            )}
            <Text fontSize="medium" color={theme.colors.primaryText} style={{ textAlign: 'center' }}>
                ニュースや社内発表資料はGoogle Sitesで提供されます。
            </Text>
          </>
        )}


        {/* デベロッパーモードのコンテンツ（管理者もアクセス可能） */}
        {(userRole === 'developer' || userRole === 'admin') && (
          <>
            <Text fontSize="h2" style={styles.sectionTitle}>開発者向け情報</Text>
            <Button onPress={() => navigation.navigate('DeveloperModeScreen')} style={[styles.modeButton, styles.devButton]}>
              デベロッパーポータルへ
            </Button>
            <Text fontSize="medium" color={theme.colors.primaryText}>
              開発中のゲーム進捗、バージョン管理、テストビルド情報。
            </Text>
          </>
        )}

        {/* 管理者モードのコンテンツ */}
        {userRole === 'admin' && (
          <>
            <Text fontSize="h2" style={styles.sectionTitle}>管理者向けツール</Text>
            <Button onPress={() => navigation.navigate('AdminModeScreen')} style={[styles.modeButton, styles.adminButton]}>
              管理者ポータルへ
            </Button>
            <Text fontSize="medium" color={theme.colors.primaryText}>
              ゲーム情報やユーザー、システム設定を管理。
            </Text>
          </>
        )}
      </ScrollView>
    </Container>
  );
};