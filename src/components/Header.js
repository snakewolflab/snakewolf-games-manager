import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1a1e22; /* テーマBGより少し濃い色 */
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled(Link)`
  color: var(--accent-green);
  font-size: 2em;
  font-weight: 700;
  text-decoration: none;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
  }

  li {
    margin-left: 30px;
  }

  a {
    color: var(--theme-text-color);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease;
    &:hover {
      color: var(--accent-yellow);
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 15px;

  button {
    padding: 8px 15px;
    font-size: 0.9em;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo to="/">GameSphere</Logo> {/* プラットフォーム名 */}
      <Nav>
        <ul>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/search">検索</Link></li>
          <li><Link to="/developer">デベロッパー</Link></li>
          {/* ログイン後に表示される項目なども考慮 */}
        </ul>
      </Nav>
      <AuthButtons>
        <Link to="/login"><button>ログイン</button></Link>
        <Link to="/register"><button>新規登録</button></Link>
      </AuthButtons>
    </HeaderContainer>
  );
}

export default Header;