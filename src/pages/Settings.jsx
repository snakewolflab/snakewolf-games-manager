// src/pages/Settings.jsx
// ユーザー設定ページのプレースホルダーコンポーネントです。
// ログインしているユーザーのみがアクセスできるように保護されています。

import React from 'react';
import { useAuth } from '../context/AuthContext'; // 認証情報とユーザーロールを取得
import { Navigate } from 'react-router-dom'; // リダイレクト用

function Settings() {
  // useAuthフックから現在のユーザー、ロード状態を取得します。
  const { currentUser, loading } = useAuth();

  // 認証状態のロード中は「ロード中...」を表示します。
  if (loading) {
    return <div className="text-center text-gray-400">ロード中...</div>;
  }

  // ユーザーがログインしていない場合は、ログインページにリダイレクトします。
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-accent-pastel mb-4">設定</h2>
        <p className="text-gray-400">
          {currentUser.email}さんの設定ページです。<br/>
          プロフィール編集やパスワード変更などが行えます。
        </p>
      </div>
    </div>
  );
}

export default Settings; // Settingsコンポーネントをエクスポートします。
