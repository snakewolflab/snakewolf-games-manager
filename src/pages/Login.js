// src/pages/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // AuthContextからuseAuthフックをインポート

// ページ全体のコンテナ
const PageContainer = styled.div`
  padding: 40px;
  min-height: calc(100vh - 140px); /* ヘッダーとフッターの高さを考慮 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-bg-color); /* テーマの背景色 */
  color: var(--theme-text-color); /* テーマの文字色 */
`;

// フォームのラッパー
const FormWrapper = styled.div`
  background-color: #2e343b; /* カードの背景色 */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 要素間のスペース */
`;

// タイトル
const Title = styled.h2`
  color: var(--accent-blue); /* アクセント青色 */
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
`;

// 入力グループ
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* ラベルと入力フィールド間のスペース */

  label {
    color: var(--theme-text-color);
    font-weight: 700;
  }
`;

// エラーメッセージ
const ErrorMessage = styled.p`
  color: var(--accent-red); /* アクセント赤色 */
  font-size: 0.9em;
  text-align: center;
  margin-top: -10px;
`;

// フッターテキスト
const FooterText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9em;

  a {
    font-weight: 700;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態
  const { login, currentUser } = useAuth(); // useAuthフックからlogin関数とcurrentUserを取得
  const navigate = useNavigate(); // リダイレクトのためのnavigateフック

  // 既にログインしている場合はホームにリダイレクト
  if (currentUser) {
    navigate('/');
    return null; // リダイレクト後にレンダリングを停止
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット
    setLoading(true); // ローディング開始

    try {
      await login(email, password); // Firebaseのlogin関数を呼び出し
      navigate('/'); // ログイン成功後、ホームにリダイレクト
    } catch (err) {
      console.error("ログインエラー:", err);
      // Firebaseのエラーコードに基づいてユーザーフレンドリーなメッセージを表示
      switch (err.code) {
        case 'auth/user-not-found':
          setError('ユーザーが見つかりません。メールアドレスを確認してください。');
          break;
        case 'auth/wrong-password':
          setError('パスワードが間違っています。');
          break;
        case 'auth/invalid-email':
          setError('無効なメールアドレス形式です。');
          break;
        case 'auth/too-many-requests':
          setError('複数回のログイン失敗により、アカウントが一時的にロックされています。しばらくしてから再度お試しください。');
          break;
        default:
          setError('ログインに失敗しました。再度お試しください。');
          break;
      }
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <PageContainer>
      <FormWrapper>
        <Title>ログイン</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* エラーメッセージの表示 */}
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <button type="submit" disabled={loading}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <FooterText>
          アカウントをお持ちではありませんか？ <Link to="/register">新規登録</Link>
        </FooterText>
      </FormWrapper>
    </PageContainer>
  );
}

export default Login;
