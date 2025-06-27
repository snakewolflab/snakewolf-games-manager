// src/components/Navbar.jsx
// アプリケーションのナビゲーションバーコンポーネントです。
// ユーザーのロールに基づいてリンクの表示を制御します。

import React from 'react';
import { Link } from 'react-router-dom'; // ルーティング用のLinkコンポーネント
import { useAuth } from '../context/AuthContext'; // 認証コンテキストから情報を取得

function Navbar() {
  // useAuthフックを使って、現在のユーザー、ログアウト関数、ユーザーロールを取得します。
  const { currentUser, logout, userRole } = useAuth();

  // ログアウト処理をハンドルします。
  const handleLogout = async () => {
    try {
      await logout();
      // ログアウト後のリダイレクトなどはAuthContext内で適切に処理されるか、
      // またはナビゲーションコンポーネントの外で処理されます。
    } catch (error) {
      console.error("ログアウトエラー:", error); // ログアウトエラー
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* ホームへのリンクとアプリケーションタイトル */}
        <Link to="/" className="text-2xl font-bold text-accent-pastel hover:text-blue-400 transition-colors duration-200">
          🎮 Game Store
        </Link>
        {/* ナビゲーションリンクのセクション */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-text-light hover:text-blue-400 transition-colors duration-200">ホーム</Link> {/* Home */}
          <Link to="/search" className="text-text-light hover:text-blue-400 transition-colors duration-200">検索</Link> {/* Search */}
          {/* ユーザーがログインしている場合にのみ表示される要素 */}
          {currentUser ? (
            <>
              {/* ユーザーロールに基づいて表示されるリンクを制御します。 */}
              {/* 開発者ポータル: 開発者または管理者のみ */}
              {(userRole === 'developer' || userRole === 'admin') && (
                <Link to="/developer" className="text-text-light hover:text-blue-400 transition-colors duration-200">開発者ポータル</Link> // Developer Portal
              )}
              {/* 分析ポータル: 従業員、開発者、または管理者のみ */}
              {(userRole === 'employee' || userRole === 'developer' || userRole === 'admin') && (
                <Link to="/analytics" className="text-text-light hover:text-blue-400 transition-colors duration-200">分析ポータル</Link> // Analytics Portal
              )}
              {/* 管理者ポータル: 管理者のみ */}
              {userRole === 'admin' && (
                <Link to="/admin" className="text-text-light hover:text-blue-400 transition-colors duration-200">管理者ポータル</Link> // Admin Portal
              )}
              <Link to="/settings" className="text-text-light hover:text-blue-400 transition-colors duration-200">設定</Link> {/* Settings */}
              {/* ログアウトボタン */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-full transition-colors duration-200"
              >
                ログアウト {/* Logout */}
              </button>
            </>
          ) : (
            // ユーザーがログインしていない場合にのみ表示されるログインリンク
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-full transition-colors duration-200">
              ログイン {/* Login */}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; // Export the Navbar component.
