// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics"; // Firebase Analyticsをインポート

// Canvas環境から提供されるFirebase設定と認証トークンを使用します。
// ローカル環境での開発時には、ここで提供された firebaseConfig がフォールバックとして使用されます。
// These are globally available variables in the Canvas environment.
// '__app_id', '__firebase_config', '__initial_auth_token' が未定義の場合のフォールバック値を設定
const firebaseConfig = {
  apiKey: "AIzaSyAAW6DjuHnsxNGEpZZJEKfWjOZEF0G5-4M",
  authDomain: "snakewolf-games.firebaseapp.com",
  databaseURL: "https://snakewolf-games-default-rtdb.firebaseio.com",
  projectId: "snakewolf-games",
  storageBucket: "snakewolf-games.firebasestorage.app",
  messagingSenderId: "358677794188",
  appId: "1:358677794188:web:e8f083f0d832ef4ad35aa9",
  measurementId: "G-60NDZWSQHL"
};

const providedInitialAuthToken = typeof window !== 'undefined' && typeof window.__initial_auth_token !== 'undefined' ? window.__initial_auth_token : null;


// Firebaseアプリを初期化します。
const app = initializeApp(firebaseConfig);

// Firebase AuthとFirestoreのインスタンスを取得します。
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase Analyticsのインスタンスを取得します。
const analytics = getAnalytics(app);

// 認証状態の準備ができたかどうかを追跡するためのPromiseです。
// このPromiseは、最初の認証状態が決定されると解決します。
let isAuthReadyPromise = new Promise(resolve => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    // 認証状態が変更されたらPromiseを解決します。
    resolve(user);
    // 初回認証状態の確認後、リスナーを解除します。
    unsubscribe();
  });
});

/**
 * アプリケーション起動時の認証処理を行います。
 * __initial_auth_token があればカスタムトークンでサインイン、なければ匿名サインインを行います。
 * Handles initial authentication on app startup.
 */
const initializeAuth = async () => {
  try {
    // onAuthStateChangedが初回発火するまで待機することで、
    // 認証状態が完全に確立されるのを保証します。
    await isAuthReadyPromise;

    // Canvas環境以外では __initial_auth_token は提供されないため、
    // ローカル開発時には匿名認証を試みます。
    if (!auth.currentUser) { // まだユーザーが認証されていない場合のみ実行
      if (providedInitialAuthToken) {
        // カスタムトークンが提供されている場合はそれを使ってサインイン
        console.log("Firebase: Attempting to sign in with custom token if not already authenticated...");
        await signInWithCustomToken(auth, providedInitialAuthToken);
        console.log("Firebase: Signed in with custom token or already authenticated.");
      } else {
        // カスタムトークンがない場合は匿名でサインイン
        console.log("Firebase: Attempting to sign in anonymously if not already authenticated...");
        await signInAnonymously(auth);
        console.log("Firebase: Signed in anonymously or already authenticated.");
      }
    } else {
      console.log("Firebase: User already authenticated on startup.", auth.currentUser.uid);
    }
  } catch (error) {
    console.error("Firebase Auth initialization error:", error);
  }
};

// アプリ起動時に認証を初期化
initializeAuth();

// Firebaseのインスタンスと認証準備Promise、Analyticsをエクスポート
export { app, auth, db, analytics, isAuthReadyPromise };
