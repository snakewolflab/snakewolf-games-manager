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

  useEffect(() => {
    const fetchCoin = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setCoin(snap.data().coin || 0);
      }
    };
    fetchCoin();
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  const showLink = (roles) => !roles || roles.includes(role);

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
            <img
              src={user.photoURL || '/avatars/default.png'}
              alt="avatar"
              width={36}
              height={36}
              style={{ borderRadius: '50%' }}
            />
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
