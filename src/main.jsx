// src/main.jsx
// Reactアプリケーションのエントリーポイントです。
// このファイルは、ReactアプリをHTMLのルート要素にマウントする役割を担います。

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // メインのAppコンポーネントをインポート
import './index.css'; // グローバルCSS (Tailwindのインポートを含む)をインポート

// HTMLの'root'要素にReactアプリをレンダリングします。
// React.StrictModeは開発中の潜在的な問題を検出するのに役立ちます。
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
