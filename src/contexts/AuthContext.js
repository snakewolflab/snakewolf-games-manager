import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banned, setBanned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(docRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.banned) {
            setBanned(true);
            signOut(auth);
            alert('このアカウントは停止されています。');
            navigate('/');
          } else {
            setUser(currentUser);
            setRole(data.role);
            setBanned(false);
          }
        }
      } else {
        setUser(null);
        setRole(null);
        setBanned(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, role, banned, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

