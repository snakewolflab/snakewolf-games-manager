// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
