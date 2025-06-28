// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

function Header() {
  const { user, role } = useAuth();

  const showLink = (requiredRoles) => !requiredRoles || requiredRoles.includes(role);

  return (
    <header className="header">
      <div className="logo">🎮 SnakeWolf</div>
      <nav className="nav">
        <Link to="/">ホーム</Link>
        {showLink(['admin', 'developer', 'employee', 'user']) && <Link to="/search">検索</Link>}
        {showLink(['admin', 'developer', 'employee', 'user']) && <Link to="/settings">設定</Link>}
        {showLink(['admin', 'developer']) && <Link to="/developer">デベロッパー</Link>}
        {showLink(['admin']) && <Link to="/analytics">アナリティクス</Link>}
        {showLink(['admin']) && <Link to="/admin">アドミン</Link>}
      </nav>
      <div className="account">
        {user ? (
          <img
            src={user.photoURL || '/avatars/default.png'}
            alt="avatar"
            width={36}
            height={36}
            style={{ borderRadius: '50%' }}
          />
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
