// src/pages/Login.jsx
// ユーザーのログインと新規登録を行うためのコンポーネントです。

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 認証関連の関数と状態を取得
import { useNavigate } from 'react-router-dom'; // ログイン後のリダイレクト用

function Login() {
  const [email, setEmail] = useState('');     // メールアドレス入力のステート
  const [password, setPassword] = useState(''); // パスワード入力のステート
  const [error, setError] = useState('');     // エラーメッセージのステート
  const [message, setMessage] = useState(''); // 成功メッセージのステート

  // useAuthフックから認証関連の関数を取得します。
  const { login, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate(); // ナビゲーションフック

  // ログインフォームの送信をハンドルします。
  const handleSubmit = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防止
    setError('');       // エラーメッセージをクリア
    setMessage('');     // 成功メッセージをクリア
    try {
      await login(email, password); // メールとパスワードでログインを試みます。
      setMessage('ログインに成功しました！');
      navigate('/'); // ログイン成功後にホームページへリダイレクト
    } catch (err) {
      setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
      console.error(err);
    }
  };

  // 新規登録をハンドルします。
  const handleSignup = async () => {
    setError('');
    setMessage('');
    try {
      await signup(email, password); // メールとパスワードで新規登録を試みます。
      setMessage('アカウントが作成されました！ログインしてください。');
      // ここでは新規登録後、自動ログインはせず、ユーザーに再度ログインを促します。
    } catch (err) {
      // Firebaseのエラーコードに基づいて、より具体的なメッセージを表示することも可能です。
      setError('サインアップに失敗しました。このメールアドレスは既に使用されている可能性があります。');
      console.error(err);
    }
  };

  // Googleアカウントでのログインをハンドルします。
  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      await signInWithGoogle(); // Googleアカウントでログインを試みます。
      setMessage('Googleアカウントでログインに成功しました！');
      navigate('/'); // ログイン成功後にホームページへリダイレクト
    } catch (err) {
      setError('Googleログインに失敗しました。');
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-background-dark text-text-light p-4">
      <div className=" p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent-pastel">ログイン</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              id="email"
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="password">
              パスワード
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              id="password"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-accent-pastel hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-3 transition-colors duration-200"
              type="submit"
            >
              ログイン
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition-colors duration-200"
              type="button"
              onClick={handleGoogleLogin}
            >
              Googleでログイン
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          <a className="font-bold text-accent-pastel hover:text-blue-500" href="#">
            パスワードを忘れた場合？
          </a>
        </p>
        <p className="text-center text-sm mt-4">
          ここへ来るのは初めてですか？{' '} {/* Do you come here once? */}
          <a href="/signup" className="font-bold text-accent-pastel hover:text-blue-500">
            新規登録する
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login; // Loginコンポーネントをエクスポートします。
