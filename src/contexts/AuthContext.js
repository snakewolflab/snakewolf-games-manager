// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db, isAuthReadyPromise } from '../firebaseConfig'; // Firebase設定をインポート

// AuthContextを作成します
const AuthContext = createContext();

/**
 * AuthContextのカスタムフックです。
 * これを使ってAuthContextの値にアクセスできます。
 * @returns {Object} 認証関連のデータと関数
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * AuthProviderコンポーネントです。
 * アプリケーションの認証状態を管理し、子コンポーネントに提供します。
 * @param {Object} { children } Reactの子要素
 * @returns {JSX.Element} プロバイダコンポーネント
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // 現在のユーザーオブジェクト
  const [loading, setLoading] = useState(true);       // 認証状態のロード中フラグ
  const [userId, setUserId] = useState(null);         // 現在のユーザーID (Firestoreパス用)

  useEffect(() => {
    // Firebase認証が初期化されるのを待ちます
    isAuthReadyPromise.then(() => {
      // Firebase認証状態の変更を監視するリスナーを設定します
      const unsubscribe = onAuthStateChanged(auth, user => {
        setCurrentUser(user); // ユーザー情報を更新
        if (user) {
          // 認証済みユーザーの場合はそのUID
          setUserId(user.uid); // Firebase AuthenticationのUIDをuserIdとして設定
          console.log("AuthContext: User logged in. UID:", user.uid);
        } else {
          // ユーザーがいない場合（ログアウトまたは未ログイン）
          // 新しいランダムなUUIDを生成して匿名セッションに使用
          const anonymousId = crypto.randomUUID(); // `crypto`はブラウザ環境で利用可能なグローバルオブジェクト
          setUserId(anonymousId);
          console.log("AuthContext: No user logged in. Using anonymous ID:", anonymousId);
        }
        setLoading(false); // ロード完了
      });

      // コンポーネントのアンマウント時にリスナーを解除します
      return unsubscribe;
    });
  }, []); // 初回マウント時のみ実行

  /**
   * メールとパスワードでユーザーを登録します。
   * @param {string} email ユーザーのメールアドレス
   * @param {string} password ユーザーのパスワード
   * @returns {Promise<UserCredential>} ユーザー認証情報
   */
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * メールとパスワードでユーザーをログインします。
   * @param {string} email ユーザーのメールアドレス
   * @param {string} password ユーザーのパスワード
   * @returns {Promise<UserCredential>} ユーザー認証情報
   */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * ユーザーをログアウトします。
   * @returns {Promise<void>}
   */
  const logout = () => {
    console.log("AuthContext: Attempting to log out...");
    return signOut(auth);
  };

  // AuthContextに提供する値
  const value = {
    currentUser,       // 現在の認証済みユーザー
    userId,            // Firestoreパスに使用するユーザーID
    signup,            // サインアップ関数
    login,             // ログイン関数
    logout,            // ログアウト関数
    loading,           // 認証状態のロード中フラグ
    db,                // Firestoreインスタンス
    auth,              // Authインスタンス
  };

  return (
    // ロードが完了するまで子コンポーネントをレンダリングしない
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>認証データをロード中...</div>}
    </AuthContext.Provider>
  );
}
