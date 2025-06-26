// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { theme as defaultTheme } from './index'; // 上で定義したテーマをインポート

// テーマの型定義
interface Theme {
  colors: {
    primaryBackground: string;
    primaryText: string;
    pastelRed: string;
    pastelBlue: string;
    pastelGreen: string;
    pastelYellow: string;
    pastelPurple: string;
    pastelOrange: string;
    modeAdmin: string;
    modeDeveloper: string;
    modeInternal: string;
    modeNormal: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSizes: {
    small: number;
    medium: number;
    large: number;
    h1: number;
    h2: number;
    h3: number;
  };
}

// Contextを作成
const ThemeContext = createContext<Theme | undefined>(undefined);

// カスタムフックを作成し、コンポーネントでテーマを利用できるようにする
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// テーマプロバイダーコンポーネント
interface ThemeProviderProps {
  children: ReactNode;
  // 必要に応じて動的にテーマを変更できるようにすることも可能
  // 例えば、ユーザーロールに基づいてテーマを切り替えるなど
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = defaultTheme }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};