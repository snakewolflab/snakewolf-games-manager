// src/components/ui/Sidebar.js
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  MdAnalytics, MdDeveloperMode, MdAdminPanelSettings,
  MdOutlineSettings, MdOutlineSearch, MdHome
} from "react-icons/md";

const menuItems = [
  { label: <MdHome />, path: '/' },
  { label: <MdOutlineSearch />, path: '/search' },
  { label: <MdOutlineSettings />, path: '/settings' },
  { label: <MdDeveloperMode />, path: '/developer' },
  { label: <MdAnalytics />, path: '/analytics' },
  { label: <MdAdminPanelSettings />, path: '/admin' },
];

export default function Sidebar({ isOpen }) {
  const { pathname } = useLocation();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <img src='/assets/logo.png' width={40} height={40} alt="logo" />
      </div>
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
