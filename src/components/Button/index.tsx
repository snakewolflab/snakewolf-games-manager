// src/components/Button/index.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text as RNText,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator, // ローディング表示用
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// ボタンの種類を定義
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

// ButtonコンポーネントのProps型定義
interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean; // ローディング状態
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = 'primary', // デフォルトはprimary
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const theme = useTheme();

  // variantに応じたスタイルを動的に生成
  const getButtonStyles = (currentVariant: ButtonVariant, isDisabled: boolean) => {
    switch (currentVariant) {
      case 'primary':
        return StyleSheet.create({
          button: {
            backgroundColor: isDisabled ? theme.colors.modeNormal : theme.colors.pastelBlue, // 例としてパステルブルーを使用
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.6 : 1,
          },
          text: {
            color: theme.colors.primaryText,
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
          },
        });
      case 'secondary':
        return StyleSheet.create({
          button: {
            backgroundColor: isDisabled ? theme.colors.modeNormal : theme.colors.pastelGreen, // 例としてパステルグリーンを使用
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.6 : 1,
          },
          text: {
            color: theme.colors.primaryText,
            fontSize: theme.fontSizes.medium,
          },
        });
      case 'outline':
        return StyleSheet.create({
          button: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: isDisabled ? theme.colors.modeNormal : theme.colors.primaryText,
            paddingVertical: theme.spacing.md - 2, // 枠線分調整
            paddingHorizontal: theme.spacing.lg - 2,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.6 : 1,
          },
          text: {
            color: isDisabled ? theme.colors.modeNormal : theme.colors.primaryText,
            fontSize: theme.fontSizes.medium,
          },
        });
      case 'text':
        return StyleSheet.create({
          button: {
            backgroundColor: 'transparent',
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.6 : 1,
          },
          text: {
            color: isDisabled ? theme.colors.modeNormal : theme.colors.pastelRed, // 例としてパステルレッドを使用
            fontSize: theme.fontSizes.medium,
          },
        });
      default:
        // デフォルトはprimaryと同じ
        return StyleSheet.create({
          button: {
            backgroundColor: isDisabled ? theme.colors.modeNormal : theme.colors.pastelBlue,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.6 : 1,
          },
          text: {
            color: theme.colors.primaryText,
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
          },
        });
    }
  };

  const currentStyles = getButtonStyles(variant, disabled || loading);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[currentStyles.button, style]}
      disabled={disabled || loading} // ローディング中も無効にする
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={currentStyles.text.color} />
      ) : (
        <RNText style={[currentStyles.text, textStyle]}>
          {children}
        </RNText>
      )}
    </TouchableOpacity>
  );
};