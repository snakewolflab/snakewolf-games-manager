// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext'; // AuthProviderをインポート
import './firebaseConfig'; // Firebaseの初期化を実行するが、エクスポートされたものはここでは直接使用しない


// React 18の新しいAPIを使ってルートを作成します
const root = ReactDOM.createRoot(document.getElementById('root'));

// アプリケーションをレンダリングします
root.render(
  <React.StrictMode>
    <GlobalStyles /> {/* グローバルスタイルを適用 */}
    {/* AuthProviderでAppコンポーネントをラップし、認証コンテキストを提供します */}
    <Router> {/* BrowserRouterでルーティングを有効化 */}
      <AuthProvider>
        <App /> {/* メインのAppコンポーネントを表示 */}
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
