// src/components/layout/TopBar.js
import './TopBar.css';
import { MdHelpOutline, MdNotificationsNone } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'ホーム',
  '/search': '検索',
  '/settings': '設定',
  '/developer': 'デベロッパーポータル',
  '/analytics': 'アナリティクスポータル',
  '/admin': 'アドミンポータル',
  '/account': 'アカウント',
  '/register': '新規登録',
  '/login': 'ログイン',
};

export default function TopBar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'SnakeWolf Platform';

  return (
    <div className="topbar">
      <div className="topbar-title">SnakeWolf Platform</div>
      <div style={{ textAlign: 'center' }}>
        <div className="topbar-title">{title}</div>
      </div>
      <div className="topbar-actions">
        <MdHelpOutline size={24} />
        <MdNotificationsNone size={24} />
      </div>
    </div>
  );
}
