// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Layout from '../components/Layout';

const iconsBaseUrl = "https://raw.githubusercontent.com/snakewolflab/character-icon/main/";
const predefinedIcons = [
  iconsBaseUrl + 'elephant.png',
  iconsBaseUrl + 'panda.png',
  iconsBaseUrl + 'giraffe.png',
  iconsBaseUrl + 'lion.png',
  iconsBaseUrl + 'koala.png',
  iconsBaseUrl + 'tiger.png',
  iconsBaseUrl + 'red-panda.png',
  iconsBaseUrl + 'capybara.png',
  iconsBaseUrl + 'meerkat.png',
  iconsBaseUrl + 'zebra.png',
  iconsBaseUrl + 'polar-bear.png',
  iconsBaseUrl + 'leopard.png',
  iconsBaseUrl + 'kangaroo.png',
  iconsBaseUrl + 'monkey.png',
  iconsBaseUrl + 'hippopotamus.png',
  iconsBaseUrl + 'flamingo.png',
  iconsBaseUrl + 'rhino.png',
  iconsBaseUrl + 'chimpanzee.png',
  iconsBaseUrl + 'eagle.png',
  iconsBaseUrl + 'bear.png',
  iconsBaseUrl + 'snake.png',
  iconsBaseUrl + 'wolf.png',
  iconsBaseUrl + 'gorilla.png',
  iconsBaseUrl + 'owl.png',
];

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pin, setPin] = useState('');
  const [id, setId] = useState('');
  const [photoURL, setPhotoURL] = useState(predefinedIcons[0]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName, photoURL });

      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        email,
        photoURL,
        role: 'user',
        coin: 0,
        birthday,
        pin,
        id: id.startsWith('@') ? id : '@' + id,
      });

      alert('登録が完了しました');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h1>新規登録</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="ディスプレイネーム"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="@ユーザーID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="PIN (4桁)"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
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
        <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
          {predefinedIcons.map((icon, idx) => (
            <img
              key={idx}
              src={icon}
              alt="icon"
              width={50}
              height={50}
              style={{
                borderRadius: '50%',
                border: photoURL === icon ? '2px solid var(--accent-blue)' : '2px solid transparent',
                cursor: 'pointer',
              }}
              onClick={() => setPhotoURL(icon)}
            />
          ))}
        </div>
        <button type="submit" disabled={loading}>{loading ? '登録中...' : '登録'}</button>
        {error && <p style={{ color: 'var(--accent-red)' }}>{error}</p>}
      </form>
    </Layout>
  );
}

export default RegisterPage;
