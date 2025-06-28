// src/pages/AnalyticsPortal.jsx
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';

function AnalyticsPortal() {
  useEffect(() => {
    // 必要に応じてサードパーティ埋め込みコードなどをここに記述
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin", "developer"]}>
      <Layout>
        <h1>Google Analytics ポータル</h1>
        <p>Firebase 連携の Google Analytics のデータ参照ができます。</p>

        {/* 埋め込み or 画像・外部レポート */}
        <section style={{ marginTop: '2rem' }}>
          <h2>📊 外部レポートの埋め込み</h2>
          <iframe
            title="Google Analytics Report"
            width="100%"
            height="500"
            frameBorder="0"
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
            src="https://datastudio.google.com/embed/reporting/f70c3df7-d330-4eca-b8e7-737122472d4a/page/1M" // ここに共有リンクを指定
            allowFullScreen
          ></iframe>
        </section>

        {/* レポート画像の例 */}
        <section style={{ marginTop: '2rem' }}>
          <h2>📷 スクリーンショットからの統計</h2>
          <img
            src="/images/analytics_example_chart.png" // public/images/ に保存した画像を想定
            alt="Analytics Chart"
            style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '1rem' }}
          />
        </section>

        {/* 外部リンク */}
        <div style={{ marginTop: '2rem' }}>
          <a
            href="https://analytics.google.com/analytics/web/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3498bd', fontWeight: 'bold' }}
          >
            ▶ Google Analytics ダッシュボードを開く
          </a>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

export default AnalyticsPortal;
