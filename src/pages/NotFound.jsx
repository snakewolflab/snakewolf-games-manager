// src/pages/NotFound.jsx
// 404エラーページ（ページが見つからない場合）のコンポーネントです。

import React from 'react';
import { Link } from 'react-router-dom'; // ホームページへのリンク用

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center p-4 text-center">
      <div className=" p-8 rounded-lg">
        <h2 className="text-6xl font-bold text-red-500 mb-4">404</h2>
        <p className="text-xl text-text-light mb-6">ページが見つかりません</p>
        <p className="text-gray-400 mb-8">お探しのページは削除されたか、名前が変更されたか、一時的に利用できません。</p>
        {/* ホームページに戻るボタン */}
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}

export default NotFound; // NotFoundコンポーネントをエクスポートします。
