// src/pages/Home.jsx
// ホームページコンポーネントです。最新のゲームをFirestoreから取得して表示します。

import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore'; // Firestoreからデータを取得するための関数
import { db } from '../lib/firebase'; // FirebaseのFirestoreインスタンスをインポート
import GameCard from '../components/GameCard'; // ゲームカードコンポーネントをインポート

function Home() {
  const [games, setGames] = useState([]); // 取得したゲームデータを保持するステート
  const [loading, setLoading] = useState(true); // データロード中の状態を管理するステート
  const [error, setError] = useState(null); // エラーメッセージを保持するステート

  // コンポーネントマウント時にゲームデータをフェッチします。
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCol = collection(db, 'games'); // 'games'コレクションへの参照を取得
        // Firebase FirestoreのorderByは、対応するインデックスが必要な場合があります。
        // Firebaseコンソールに表示される警告に従って、必要なインデックスを作成してください。
        // 例: const q = query(gamesCol, orderBy('releaseDate', 'desc'), limit(5));
        const q = query(gamesCol); // 現状はソートやリミットなしのクエリ

        const gameSnapshot = await getDocs(q); // クエリを実行し、スナップショットを取得
        let gameList = gameSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // ドキュメントデータをリストに変換

        // FirestoreのorderByを使わない場合、クライアント側でソートします。
        // releaseDate（リリース日）に基づいて降順にソートし、最新のゲームを先頭にします。
        gameList.sort((a, b) => {
          const dateA = a.releaseDate ? new Date(a.releaseDate) : new Date(0); // 日付がない場合はエポックタイムを使用
          const dateB = b.releaseDate ? new Date(b.releaseDate) : new Date(0);
          return dateB - dateA; // 降順ソート
        });
        setGames(gameList.slice(0, 5)); // ソートされたリストから最新の5件のみを表示
      } catch (err) {
        console.error("ゲームの取得中にエラーが発生しました:", err);
        setError("ゲームのロード中にエラーが発生しました。Firebase Firestoreの`games`コレクションにデータがあるか確認してください。");
      } finally {
        setLoading(false); // ロード完了
      }
    };
    fetchGames(); // フェッチ関数を実行
  }, []); // 依存配列が空なので、コンポーネントマウント時に一度だけ実行されます。

  // ロード中のUI
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="text-center text-gray-400 text-lg">ゲームをロード中...</div>
      </div>
    );
  }

  // エラー発生時のUI
  if (error) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="text-center text-red-500 text-lg p-4 bg-gray-700 rounded-lg shadow-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-accent-pastel mb-8 text-center">注目のゲーム</h2>
      {games.length === 0 ? (
        // ゲームデータがない場合のメッセージ
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <p className="text-gray-400 text-lg text-center p-4 bg-gray-700 rounded-lg shadow-md">
            まだゲームがありません。<br/>
            Firebase Firestoreの`games`コレクションにデータを追加してください。
          </p>
        </div>
      ) : (
        // ゲームデータがある場合は、GridレイアウトでGameCardを表示します。
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home; // Homeコンポーネントをエクスポートします。
