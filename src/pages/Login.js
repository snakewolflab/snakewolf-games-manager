// src/pages/LoginPage.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Layout from '../components/Layout';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));

      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'developer') navigate('/developer');
        else if (role === 'employee') navigate('/');
        else navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'ログイン中...' : 'ログイン'}</button>
        {error && <p style={{ color: 'var(--accent-red)' }}>{error}</p>}
      </form>
    </Layout>
  );
}

export default LoginPage;
