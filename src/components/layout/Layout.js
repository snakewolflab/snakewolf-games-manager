// src/components/layout/Layout.js
import { useState } from 'react';
import Sidebar from '../ui/Sidebar';
import SubSidebar from '../ui/SubSidebar';
import TopBar from './TopBar';
import UserStatusBar from '../ui/UserStatusBar';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, userData, friends } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-wrapper">
      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="layout-main">
          <TopBar toggleSidebar={toggleSidebar} />
          <main className="main-content">
            {children}
          </main>
        </div>
        <div className="subsidebar-wrapper">
          <SubSidebar role={userData?.role || 'user'} friends={friends || []} />
          <UserStatusBar />
        </div>
      </div>
    </div>
  );
}