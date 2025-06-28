// src/pages/SettingsPage.jsx
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { db, auth } from '../firebase';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

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

function SettingsPage() {
  const { user, loading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [pin, setPin] = useState('');
  const [id, setId] = useState('');
  const [photoURL, setPhotoURL] = useState(predefinedIcons[0]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      const load = async () => {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setDisplayName(data.displayName);
          setPin(data.pin);
          setId(data.id);
          setPhotoURL(data.photoURL);
        }
      };
      load();
    }
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        pin,
        id: id.startsWith('@') ? id : '@' + id,
        photoURL,
      });
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setMessage('プロフィールを更新しました');
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user && !loading) return navigate('/login');

  return (
    <Layout>
      <h1>プロフィール設定</h1>
      <form onSubmit={handleSubmit}>
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
          type="password"
          placeholder="PIN (4桁)"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
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
        <button type="submit">保存</button>
        {message && <p>{message}</p>}
      </form>
    </Layout>
  );
}

export default SettingsPage;
