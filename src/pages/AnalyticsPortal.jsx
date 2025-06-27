// src/pages/AnalyticsPortal.jsx
// 分析ポータルのプレースホルダーコンポーネントです。
// 特定のロールを持つユーザーのみがアクセスできるように保護されています。

import React from 'react';
import { useAuth } from '../context/AuthContext'; // 認証情報とユーザーロールを取得
import { Navigate } from 'react-router-dom'; // リダイレクト用

function AnalyticsPortal() {
  // useAuthフックから現在のユーザー、ロード状態、ユーザーロールを取得します。
  const { currentUser, loading, userRole } = useAuth();

  // 認証状態のロード中は「ロード中...」を表示します。
  if (loading) {
    return <div className="text-center text-gray-400">ロード中...</div>; // Loading...
  }

  // ユーザーがログインしていない場合、またはロールが'employee'、'developer'、'admin'のいずれでもない場合は、
  // ログインページにリダイレクトします。
  if (!currentUser || (userRole !== 'employee' && userRole !== 'developer' && userRole !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-accent-pastel mb-4">分析ポータル</h2> {/* Analytics Portal */}
        <p className="text-gray-400">
          {currentUser.email}さん ({userRole})、ようこそ！<br/> {/* Welcome, {currentUser.email} ({userRole})! */}
          ここではストア全体のパフォーマンスやゲームの分析情報が表示されます。 {/* Here you can view overall store performance and game analytics. */}
        </p>
        <p className="text-gray-500 mt-4 text-sm">
          Googleアナリティクスとの連携は、<br/> {/* Integration with Google Analytics */}
          Googleアナリティクスの管理画面へのリンクやAPI連携（別途設定が必要）で行われます。 {/* will be done via links to the Google Analytics management screen or API integration (requires separate setup). */}
        </p>
      </div>
    </div>
  );
}

export default AnalyticsPortal; // Export the AnalyticsPortal component.
