// src/pages/AdminPortal.jsx
// 管理者ポータルのプレースホルダーコンポーネントです。
// 'admin'ロールを持つユーザーのみがアクセスできるように保護されています。

import React from 'react';
import { useAuth } from '../context/AuthContext'; // 認証情報とユーザーロールを取得
import { Navigate } from 'react-router-dom'; // リダイレクト用

function AdminPortal() {
  // useAuthフックから現在のユーザー、ロード状態、ユーザーロールを取得します。
  const { currentUser, loading, userRole } = useAuth();

  // 認証状態のロード中は「ロード中...」を表示します。
  if (loading) {
    return <div className="text-center text-gray-400">ロード中...</div>; // Loading...
  }

  // ユーザーがログインしていない場合、またはロールが'admin'ではない場合は、
  // ログインページにリダイレクトします。
  if (!currentUser || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-accent-pastel mb-4">管理者ポータル</h2> {/* Admin Portal */}
        <p className="text-gray-400">
          {currentUser.email}さん ({userRole})、ようこそ！<br/> {/* Welcome, {currentUser.email} ({userRole})! */}
          ここではユーザー管理、デベロッパー管理、ゲームコンテンツ管理などが行えます。 {/* Here you can manage users, developers, game content, and more. */}
        </p>
      </div>
    </div>
  );
}

export default AdminPortal; // Export the AdminPortal component.
