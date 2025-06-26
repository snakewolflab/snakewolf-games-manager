// src/theme/index.ts

interface Colors {
  primaryBackground: string;
  primaryText: string;
  // 以下、パステルカラーを含む色彩を定義
  pastelRed: string;
  pastelBlue: string;
  pastelGreen: string;
  pastelYellow: string;
  pastelPurple: string;
  pastelOrange: string;
  // アクセスモードごとの識別色 (パステルカラーから派生させるか、別途定義)
  modeAdmin: string;
  modeDeveloper: string;
  modeInternal: string;
  modeNormal: string;
}

interface Theme {
  colors: Colors;
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
  // 必要に応じて他のテーマ要素 (例: borderRadius, shadows など) を追加
}

// 指定されたテーマ色
const BASE_COLORS = {
  primaryBackground: '#262a2f', // 背景統一色
  primaryText: '#fdfcfd',      // 文字色統一色
};

// パステルカラーの定義
// 具体的なパステルカラーのRGB値を指定します。
// これはあくまで例なので、後で好みに合わせて調整してください。
const PASTEL_COLORS = {
  pastelRed: '#FFB3BA',    // 淡い赤
  pastelBlue: '#BAE1FF',   // 淡い青
  pastelGreen: '#BAFFC9',  // 淡い緑
  pastelYellow: '#FFFFBA', // 淡い黄
  pastelPurple: '#CBB3FF', // 淡い紫
  pastelOrange: '#FFD6BA', // 淡いオレンジ
};

// アクセスモードごとの識別色
// パステルカラーの中から選ぶか、調和する色を新たに設定します
const MODE_COLORS = {
  modeAdmin: '#FFB3BA',     // 例: パステルレッド
  modeDeveloper: '#BAE1FF',  // 例: パステルブルー
  modeInternal: '#BAFFC9',   // 例: パステルグリーン
  modeNormal: '#FFFFBA',     // 例: パステルイエロー (ユーザー向けは明るく親しみやすい色)
};

export const theme: Theme = {
  colors: {
    ...BASE_COLORS,
    ...PASTEL_COLORS,
    ...MODE_COLORS,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    h1: 32,
    h2: 24,
    h3: 18,
  },
};