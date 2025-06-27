// src/components/Footer.jsx
// アプリケーションのフッターコンポーネントです。

import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-6 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Game Store. All rights reserved.</p>
        <div className="mt-2 text-sm">
          {/* プライバシーポリシーと利用規約へのリンク */}
          <a href="#" className="hover:underline mx-2">プライバシーポリシー</a> |
          <a href="#" className="hover:underline mx-2">利用規約</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; // Footerコンポーネントをエクスポートします。
