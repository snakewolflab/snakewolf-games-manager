// src/pages/Login.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from '../components/Text';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { useAuth, UserRole } from '../contexts/AuthContext'; // AuthContextをインポート

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { login } = useAuth(); // AuthContextからlogin関数を取得
  const [selectedRole, setSelectedRole] = useState<UserRole>('normal'); // 初期ロール選択

  const handleLogin = () => {
    // 実際にはここで認証ロジックを実行し、取得したユーザーロールをlogin関数に渡す
    console.log(`Logging in as ${selectedRole}...`);
    login(selectedRole); // 仮のロールでログイン
    navigation.replace('/'); // ★変更: ログイン成功後、ホーム画面へ遷移
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
      color: theme.colors.pastelOrange,
    },
    roleButtonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // ボタンが多すぎたら改行する
      justifyContent: 'center',
      marginBottom: theme.spacing.lg,
    },
    roleButton: {
      margin: theme.spacing.sm,
      width: '40%', // 2列で表示
    },
    selectedRoleButton: {
      borderColor: theme.colors.pastelRed, // 選択されたロールのボタンの枠線色
      borderWidth: 2,
    },
    loginButton: {
      marginTop: theme.spacing.md,
      width: '80%',
    },
  });

  return (
    <Container style={styles.container}>
      <Text fontSize="h1" style={styles.title}>ログイン</Text>
      <Text fontSize="medium" color={theme.colors.primaryText} style={{ marginBottom: theme.spacing.md }}>
        ロールを選択してください (デモ用):
      </Text>
      <Container style={styles.roleButtonContainer}>
        {(['normal', 'internal', 'developer', 'admin'] as UserRole[]).map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? 'primary' : 'outline'}
            onPress={() => setSelectedRole(role)}
            style={[styles.roleButton, selectedRole === role && styles.selectedRoleButton]}
            textStyle={{ color: selectedRole === role ? theme.colors.primaryText : theme.colors.primaryText }}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        ))}
      </Container>
      <Button onPress={handleLogin} style={styles.loginButton}>
        ログイン
      </Button>
    </Container>
  );
};