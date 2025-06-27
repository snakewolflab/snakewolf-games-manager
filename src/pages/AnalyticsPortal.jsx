// src/pages/AnalyticsPortal.jsx
// Google Analyticsデータをアプリケーション内に「iframe」で埋め込み表示します。
// データはGoogleスプレッドシートまたはLooker Studioの公開URLを使用します。

import React from 'react';
import { useAuth } from '../context/AuthContext'; // 認証情報とユーザーロールを取得
import { Navigate } from 'react-router-dom'; // リダイレクト用

function AnalyticsPortal() {
  const { currentUser, loading, userRole } = useAuth();

  // ロールベースのアクセス制御
  if (loading) {
    return <div className="text-center text-gray-400">ロード中...</div>; // Loading...
  }

  // ユーザーがログインしていない場合、または権限がない場合はリダイレクト
  if (!currentUser || (userRole !== 'employee' && userRole !== 'developer' && userRole !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  // --- 埋め込むコンテンツのURLを設定してください ---
  // 以下のどちらか、または両方を設定し、使用する方を `embedUrl` に代入してください。
  //
  // 1. Google スプレッドシートの埋め込みURL (Webに公開されたもの):
  const googleSheetEmbedUrl = "YOUR_PUBLIC_GOOGLE_SHEET_EMBED_URL"; // <-- ここに公開されたスプレッドシートの埋め込みURLを貼り付けます

  // 2. Google Looker Studio (旧 Google データポータル) ダッシュボードの埋め込みURL:
  const lookerStudioEmbedUrl = "YOUR_LOOKER_STUDIO_EMBED_URL"; // <-- ここにLooker Studioの埋め込みURLを貼り付けます

  // 使用する埋め込みURLを選択します（例: スプレッドシートを使用する場合）
  const embedUrl = "https://lookerstudio.google.com/embed/reporting/f70c3df7-d330-4eca-b8e7-737122472d4a/page/tqZPF"; // または lookerStudioEmbedUrl;

  return (
    <div className="min-h-[calc(100vh-16rem)] p-4 text-text-light">
      <div className=" p-8 rounded-lg mb-8">
        <h2 className="text-3xl font-bold text-accent-pastel mb-4 text-center">分析ポータル</h2> {/* Analytics Portal */}
        <p className="text-gray-400 text-center mb-6">
          {currentUser.email}さん ({userRole})、ようこそ！<br/> {/* Welcome, {currentUser.email} ({userRole})! */}
          ここではストア全体のパフォーマンスやゲームの分析情報が表示されます。 {/* Here you can view overall store performance and game analytics. */}
        </p>
        <p className="text-yellow-400 mt-4 text-sm text-center font-bold">
          このページは、外部のGoogleスプレッドシートまたはLooker Studioレポートをiframeで埋め込んでいます。<br/>
          データの内容と表示は、埋め込み元のコンテンツによって決定されます。
          **（重要: 埋め込むコンテンツは「Webに公開」されている必要があります。機密データの埋め込みには十分ご注意ください。）**
        </p>
      </div>

      {/* iframe を使用して外部コンテンツを埋め込む */}
      {/* embedUrlがデフォルト値のままの場合は警告を表示 */}
      {embedUrl === "YOUR_PUBLIC_GOOGLE_SHEET_EMBED_URL" || embedUrl === "YOUR_LOOKER_STUDIO_EMBED_URL" ? (
         <div className="text-center text-red-500 text-lg p-4 bg-gray-700 rounded-lg shadow-md">
           埋め込みURLが設定されていません。「YOUR_PUBLIC_GOOGLE_SHEET_EMBED_URL」または「YOUR_LOOKER_STUDIO_EMBED_URL」を実際のURLに置き換えてください。
         </div>
      ) : (
        <div className="p-4 rounded-lg" style={{ minHeight: '600px', width: '100%' }}>
          <iframe
            src={embedUrl}
            title="Analytics Dashboard"
            // iframeのスタイルを直接設定して親コンテナのサイズに合わせる
            style={{
              width: '100%',
              height: '100%',
              border: 'none', // iframeの枠線をなくす
              borderRadius: '8px', // 親要素の角の丸みに合わせる
              overflow: 'hidden',
            }}
            // フルスクリーン表示を許可する属性
            allowFullScreen={true}
            webkitallowfullscreen="true" // Safari/Chrome 互換性
            mozallowfullscreen="true"    // Firefox 互換性
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPortal; // Export the AnalyticsPortal component.
