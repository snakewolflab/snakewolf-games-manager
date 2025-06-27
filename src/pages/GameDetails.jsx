// src/pages/GameDetails.jsx
// 個々のゲーム詳細を表示するためのプレースホルダーコンポーネントです。

import React from 'react';
import { useParams } from 'react-router-dom'; // URLパラメーターからゲームIDを取得

function GameDetails() {
  // useParamsフックを使ってURLから`id`パラメーターを取得します。
  const { id } = useParams();

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-accent-pastel mb-4">ゲーム詳細</h2>
        <p className="text-gray-400">
          ゲームID: <span className="font-bold text-text-light">{id}</span> の詳細ページです。<br/>
          ここにゲームの説明、スクリーンショット、購入ボタンなどが表示されます。
        </p>
      </div>
    </div>
  );
}

export default GameDetails; // GameDetailsコンポーネントをエクスポートします。
