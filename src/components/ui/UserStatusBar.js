// src/components/ui/UserStatusBar.js
import './UserStatusBar.css';
import { MdSettings } from 'react-icons/md';

export default function UserStatusBar() {
  return (
    <div className="user-status-bar">
      <div className="user-info">
        <div className="user-avatar" />
        <div className="user-name">UserName</div>
      </div>
      <MdSettings size={20} className="settings-icon" />
    </div>
  );
}
