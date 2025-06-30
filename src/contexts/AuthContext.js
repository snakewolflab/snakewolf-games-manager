// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pinVerified, setPinVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.banned) {
            alert('このアカウントは利用停止されています');
            await signOut(auth);
          } else {
            setUserData(data);
          }
        }
      } else {
        setUserData(null);
        setPinVerified(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const verifyPin = (pin) => {
    if (userData?.pin === pin) {
      setPinVerified(true);
      return true;
    }
    return false;
  };

  const register = async (email, password, displayName, birthday, pin, id, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName, photoURL });

    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      email,
      displayName,
      photoURL,
      role: 'user',
      banned: false,
      coin: 0,
      birthday,
      pin,
      id,
      batch: 'none',
      friends: [],
      friendRequests: [],
      sentRequests: []
    });
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const updateCoin = async (uid, newCoin) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { coin: newCoin });
  };

  const banUser = async (uid) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { banned: true });
  };

  const unbanUser = async (uid) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { banned: false });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      userData,
      register,
      login,
      logout,
      verifyPin,
      pinVerified,
      updateCoin,
      banUser,
      unbanUser
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
