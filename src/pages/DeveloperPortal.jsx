// src/pages/DeveloperPortal.jsx
// 開発者ポータルのプレースホルダーコンポーネントです。
// 特定のロールを持つユーザーのみがアクセスできるように保護されています。

import React from 'react';
import { useAuth } from '../context/AuthContext'; // 認証情報とユーザーロールを取得
import { Navigate } from 'react-router-dom'; // リダイレクト用

function DeveloperPortal() {
  // useAuthフックから現在のユーザー、ロード状態、ユーザーロールを取得します。
  const { currentUser, loading, userRole } = useAuth();

  // 認証状態のロード中は「ロード中...」を表示します。
  if (loading) {
    return <div className="text-center text-gray-400">ロード中...</div>; // Loading...
  }

  // ユーザーがログインしていない場合、またはロールが'developer'でも'admin'でもない場合は、
  // ログインページにリダイレクトします。
  if (!currentUser || (userRole !== 'developer' && userRole !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-accent-pastel mb-4">開発者ポータル</h2> {/* Developer Portal */}
        <p className="text-gray-400">
          {currentUser.email}さん ({userRole})、ようこそ！<br/> {/* Welcome, {currentUser.email} ({userRole})! */}
          ここではゲームの追加、編集、進捗状況の管理などができます。 {/* Here you can add, edit, and manage the progress of games. */}
        </p>
      </div>
    </div>
  );
}

export default DeveloperPortal; // Export the DeveloperPortal component.
