// src/components/Text/index.tsx
import React from 'react';
import { Text as RNText, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider'; // テーマフックをインポート

// TextコンポーネントのProps型定義
interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>; // 外部からスタイルを上書きできるように
  fontSize?: 'small' | 'medium' | 'large' | 'h1' | 'h2' | 'h3'; // テーマのフォントサイズ
  color?: string; // 文字色を直接指定できるように
  // 必要に応じて、fontWeight, textAlignなども追加
}

export const Text: React.FC<TextProps> = ({
  children,
  style,
  fontSize = 'medium', // デフォルトはmedium
  color,
}) => {
  const theme = useTheme(); // テーマを取得

  // スタイルシートを動的に作成
  const dynamicStyles = StyleSheet.create({
    text: {
      color: color || theme.colors.primaryText, // 指定がなければテーマのprimaryText
      fontSize: theme.fontSizes[fontSize],     // テーマのフォントサイズを適用
    },
  });

  return (
    <RNText style={[dynamicStyles.text, style]}>
      {children}
    </RNText>
  );
};