// src/App.jsx
// アプリケーションの主要なルーティングとコンテキストプロバイダを設定します。

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// コンポーネントとページをインポートします。
// これらのパスがプロジェクト内の実際のファイルパスと一致していることを確認してください。
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';
import DeveloperPortal from './pages/DeveloperPortal';
import AnalyticsPortal from './pages/AnalyticsPortal';
import AdminPortal from './pages/AdminPortal';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

import Layout from './components/Layout'; // アプリケーションの共通レイアウト
import { AuthProvider } from './context/AuthContext'; // 認証コンテキストプロバイダ

function App() {
  return (
    // AuthProviderがアプリケーション全体で認証情報を提供します。
    <AuthProvider>
      {/* Routerがアプリケーションのルーティングを管理します。 */}
      <Router>
        {/* Layoutがすべてのページに共通のヘッダー、フッター、コンテンツエリアを提供します。 */}
        <Layout>
          {/* Routes内で各URLパスに対応するコンポーネントを定義します。 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/game/:id" element={<GameDetails />} />
            {/* ロールベースのアクセス制御が必要なページは、後でロジックを追加します。 */}
            <Route path="/developer" element={<DeveloperPortal />} />
            <Route path="/analytics" element={<AnalyticsPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/settings" element={<Settings />} />
            {/* 定義されていないすべてのパスに対してNotFoundページを表示します。 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App; // Appコンポーネントをエクスポートします。
