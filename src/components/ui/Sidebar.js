// src/components/ui/Sidebar.js
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { label: 'ホーム', path: '/' },
  { label: '検索', path: '/search' },
  { label: '設定', path: '/settings' },
  { label: '開発ポータル', path: '/developer' },
  { label: 'アナリティクス', path: '/analytics' },
  { label: '管理者ポータル', path: '/admin' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">SnakeWolf Platform</div>
      <nav>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
