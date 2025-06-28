import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">🎮 SnakeWolf</div>
      <nav className="nav">
        <Link to="/">ホーム</Link>
        <Link to="/search">検索</Link>
        <Link to="/settings">設定</Link>
        <Link to="/developer">デベロッパー</Link>
        <Link to="/analytics">アナリティクス</Link>
        <Link to="/admin">アドミン</Link>
      </nav>
      <div className="account">
        <Link to="/login">ログイン</Link>
        <Link to="/register">新規登録</Link>
      </div>
    </header>
  );
}

export default Header;