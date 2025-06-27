// src/lib/firebase.js
// Firebaseプロジェクトの初期化と各種サービスのエクスポートを行います。

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebaseコンソールから取得した設定情報をここに貼り付けます。
// 本番環境ではセキュリティのため、これらの値を環境変数から読み込むことを強く推奨します。
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

// Firebaseアプリを初期化します。
const app = initializeApp(firebaseConfig);

// 各Firebaseサービスへの参照を取得します。
const auth = getAuth(app); // 認証サービス
const db = getFirestore(app); // Firestoreデータベースサービス
const storage = getStorage(app); // Storageサービス

// 他のファイルからこれらのサービスにアクセスできるようにエクスポートします。
export { auth, db, storage, app };
