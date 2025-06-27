// src/components/GameCard.jsx
// 個々のゲーム情報を表示するためのカードコンポーネントです。

import React from 'react';
import { Link } from 'react-router-dom'; // ゲーム詳細ページへのリンク用

function GameCard({ game }) {
  // ゲームデータが提供されていない場合は、プレースホルダーを表示します。
  if (!game) {
    return <div className="bg-gray-700 p-4 rounded-lg shadow-md text-gray-400">ゲームデータがありません</div>;
  }

  // 画像のロードに失敗した場合のハンドラーです。
  // プレースホルダー画像に置き換え、altテキストを更新します。
  const handleImageError = (e) => {
    // ランダムな背景色とテキストカラーのプレースホルダー画像を生成します。
    const randomBgColor = Math.floor(Math.random()*16777215).toString(16);
    const randomTextColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.src = `https://placehold.co/300x200/${randomBgColor}/${randomTextColor}?text=No+Image`;
    e.target.alt = "画像なし";
  };

  return (
    // クリック可能なカード全体をゲーム詳細ページへのLinkで囲みます。
    <Link to={`/game/${game.id}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover-scale-105 hover:shadow-2xl">
        {/* ゲームのサムネイル画像を表示します。
            thumbnailUrlがない場合は、タイトルを元にしたプレースホルダー画像を生成します。
            onErrorで画像ロード失敗時のハンドラーを指定します。 */}
        <img
          src={game.thumbnailUrl || `https://placehold.co/300x200/4F46E5/FFFFFF?text=${encodeURIComponent(game.title || 'ゲーム')}`}
          alt={game.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        {/* カードのコンテンツエリア */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-text-light truncate">{game.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{game.genre || 'N/A'}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-accent-pastel text-lg font-bold">
              {game.price ? `¥${game.price.toLocaleString()}` : '無料'} {/* 価格を表示、なければ「無料」 */}
            </span>
            <span
              className="bg-blue-600 text-white text-sm py-1 px-3 rounded-full" // 「詳細」を示すタグ
            >
              詳細
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard; // GameCardコンポーネントをエクスポートします。
