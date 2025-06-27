// src/components/Layout.jsx
// アプリケーション全体の共通レイアウトを提供します。

import React from 'react';
import Navbar from './Navbar'; // ナビゲーションバーをインポート
import Footer from './Footer'; // フッターをインポート

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-text-light">
      {/* ページの最上部にナビゲーションバーを配置 */}
      <Navbar />
      {/* メインコンテンツエリア。flex-growで利用可能なスペースを埋めます。 */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children} {/* ここに各ページコンポーネントがレンダリングされます */}
      </main>
      {/* ページの最下部にフッターを配置 */}
      <Footer />
    </div>
  );
}

export default Layout; // Layoutコンポーネントをエクスポートします。
