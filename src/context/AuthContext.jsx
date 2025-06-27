// src/context/AuthContext.jsx
// このファイルは、認証状態と関連する関数をアプリケーション全体で共有するためのコンテキストです。
// ユーザーのロール情報もここで管理し、提供します。

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword, // メールとパスワードでユーザーを作成
  signInWithEmailAndPassword,   // メールとパスワードでログイン
  onAuthStateChanged,           // 認証状態の変化を監視
  signOut,                      // ログアウト
  GoogleAuthProvider,           // Google認証プロバイダ
  signInWithPopup               // ポップアップウィンドウでサインイン
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestoreからユーザーデータを取得し、新しいユーザーのロールを設定するためにsetDocを追加
import { auth, db } from '../lib/firebase'; // Firebase認証とFirestoreのインスタンスをインポート

// 認証コンテキストを作成します。
const AuthContext = createContext();

// カスタムフック `useAuth` を提供し、コンポーネントから認証コンテキストに簡単にアクセスできるようにします。
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProviderコンポーネントは、子コンポーネントに認証状態と関数を提供します。
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // 現在ログインしているユーザー
  const [loading, setLoading] = useState(true);         // 認証状態のロード中フラグ
  const [userRole, setUserRole] = useState(null);       // ユーザーのロール（例: 'user', 'developer', 'admin', 'employee'）

  // コンポーネントマウント時に認証状態の変更を購読します。
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user) {
        // ユーザーがログインしている場合、Firestoreからユーザーのロールを取得します。
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        // ユーザーがログアウトしている場合、ロールをクリアします。
        setUserRole(null);
      }
      setLoading(false); // ロード完了
    });
    return unsubscribe; // クリーンアップ関数を返し、コンポーネントアンマウント時に購読を解除します。
  }, []); // 依存配列が空なので、コンポーネントマウント時に一度だけ実行されます。

  // メールとパスワードで新しいユーザーを登録します。
  // 新規登録時、Firestoreにユーザーデータを保存し、初期ロールを設定します。
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // 新規登録成功後、Firestoreにユーザー情報を追加
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      role: 'user', // デフォルトロールを'user'に設定
      createdAt: new Date()
    });
    return userCredential;
  };

  // メールとパスワードでログインします。
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 現在のユーザーをログアウトします。
  const logout = () => {
    return signOut(auth);
  };

  // Googleアカウントでログインします。
  // Googleログイン時もFirestoreにユーザー情報を追加または更新します。
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const userRef = doc(db, "users", userCredential.user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // ユーザーがFirestoreに存在しない場合のみ追加
      await setDoc(userRef, {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: 'user', // デフォルトロールを'user'に設定
        createdAt: new Date()
      });
    }
    return userCredential;
  };

  // Firestoreからユーザーのロールを取得するヘルパー関数です。
  // 新規ユーザーの場合、Firestoreの'users'コレクションにドキュメントがない可能性があるため、
  // デフォルトで'user'ロールを返します。管理者は手動でロールを付与します。
  async function getUserRole(uid) {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data().role || 'user'; // 'role'フィールドが存在しない場合も'user'を返す
      }
      // ドキュメントが存在しない場合（例: 新規登録直後）は、デフォルトのロールを返します。
      return 'user';
    } catch (error) {
      console.error("ユーザーロールの取得エラー:", error); // エラーが発生しました：ユーザーロールの取得
      return 'user'; // エラー発生時もデフォルトロールを返します。
    }
  }

  // AuthContextを通じて提供される値です。
  const value = {
    currentUser,   // 現在のユーザーオブジェクト
    loading,       // 認証状態のロード中フラグ
    userRole,      // ユーザーのロール
    signup,        // サインアップ関数
    login,         // ログイン関数
    logout,        // ログアウト関数
    signInWithGoogle, // Googleログイン関数
    getUserRole    // ユーザーロール取得関数
  };

  return (
    // ロードが完了してから子要素をレンダリングします。
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
