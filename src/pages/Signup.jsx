// src/pages/Signup.jsx
// 新規ユーザー登録のためのコンポーネントです。

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 認証関連の関数と状態を取得
import { useNavigate } from 'react-router-dom'; // 登録後のリダイレクト用, ログインページへのリンク用

function Signup() {
  const [email, setEmail] = useState('');     // メールアドレス入力のステート
  const [password, setPassword] = useState(''); // パスワード入力のステート
  const [confirmPassword, setConfirmPassword] = useState(''); // 確認用パスワード入力のステート
  const [error, setError] = useState('');     // エラーメッセージのステート
  const [message, setMessage] = useState(''); // 成功メッセージのステート

  // useAuthフックから認証関連の関数を取得します。
  const { signup } = useAuth();
  const navigate = useNavigate(); // ナビゲーションフック

  // 新規登録フォームの送信をハンドルします。
  const handleSubmit = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防止
    setError('');       // エラーメッセージをクリア
    setMessage('');     // 成功メッセージをクリア

    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    try {
      await signup(email, password); // メールとパスワードで新規登録を試みます。
      setMessage('アカウントが正常に作成されました！ログインページに移動します...');
      // 成功後、自動的にログインページへリダイレクト
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2秒後にリダイレクト
    } catch (err) {
      // Firebaseのエラーコードに基づいて、より具体的なメッセージを表示
      let errorMessage = '登録に失敗しました。';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'このメールアドレスは既に登録されています。';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = '無効なメールアドレス形式です。';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'パスワードは最低6文字以上である必要があります。';
      }
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-background-dark text-text-light p-4">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent-pastel">新規ユーザー登録</h2> {/* New User Registration */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="email">
              メールアドレス {/* Email Address */}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              id="email"
              type="email"
              placeholder="メールアドレス" // Email Address
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="password">
              パスワード {/* Password */}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              id="password"
              type="password"
              placeholder="パスワード (6文字以上)" // Password (6+ characters)
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="confirm-password">
              パスワードの確認 {/* Confirm Password */}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              id="confirm-password"
              type="password"
              placeholder="パスワードを再入力" // Re-enter password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition-colors duration-200"
              type="submit"
            >
              アカウントを登録 {/* Register Account */}
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          既にアカウントをお持ちですか？{' '} {/* Already have an account? */}
          <a href="/login" className="font-bold text-accent-pastel hover:text-blue-500">
            ログインする
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup; // Export the Signup component.
