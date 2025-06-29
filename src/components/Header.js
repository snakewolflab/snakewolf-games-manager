// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import './Header.css';

function Header() {
  const { user, role } = useAuth();
  const [coin, setCoin] = useState(0);
  const [batch, setBatch] = useState('none'); // Add state for batch

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const userData = snap.data();
          setCoin(userData.coin || 0);
          setBatch(userData.batch || 'none'); // Set batch state
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  const showLink = (roles) => !roles || roles.includes(role);

  // Function to determine batch image source
  const getBatchImageSrc = (batchType) => {
    switch (batchType) {
      case 'common':
        return '/assets/batch/common.png';
      case 'official':
        return '/assets/batch/official.png';
      case 'education':
        return '/assets/batch/education.png';
      case 'company':
        return '/assets/batch/company.png';
      default:
        return '/assets/batch/none.png';
    }
  };

  return (
    <header className="header">
      <div className="logo">🎮 SnakeWolf</div>
      <nav className="nav">
        <Link to="/">ホーム</Link>
        {showLink(['admin', 'developer', 'employee', 'user']) && <Link to="/search">検索</Link>}
        {showLink(['admin', 'developer', 'employee', 'user']) && <Link to="/settings">設定</Link>}
        {showLink(['admin', 'developer']) && <Link to="/developer">デベロッパー</Link>}
        {showLink(['admin', 'developer', 'employee']) && <Link to="/analytics">アナリティクス</Link>}
        {showLink(['admin']) && <Link to="/admin">アドミン</Link>}
      </nav>
      <div className="account">
        {user ? (
          <div className="account-info">
            <span>{coin} 🪙</span>
            <div className="avatar-container"> {/* New div to contain avatar and badge */}
              <img
                src={user.photoURL || '/avatars/default.png'}
                alt="avatar"
                width={36}
                height={36}
                style={{ borderRadius: '50%' }}
              />
              {batch !== 'none' && ( // Only render badge if it's not 'none'
                <img
                  src={getBatchImageSrc(batch)}
                  alt="batch"
                  width={16} // Increased size slightly for better visibility
                  height={16} // Increased size slightly for better visibility
                  className="batch-icon"
                />
              )}
            </div>
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        ) : (
          <>
            <Link to="/login">ログイン</Link>
            <Link to="/register">新規登録</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;