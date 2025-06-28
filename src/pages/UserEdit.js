import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function UserEdit() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ displayName: '', role: '', pin: '', id: '' });

  useEffect(() => {
    const loadUser = async () => {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        setUser(snap.data());
        setForm({
          displayName: snap.data().displayName,
          role: snap.data().role,
          pin: snap.data().pin,
          id: snap.data().id,
        });
      }
    };
    loadUser();
  }, [uid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateDoc(doc(db, 'users', uid), form);
    alert('更新しました');
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Layout>
        <h1>ユーザー編集</h1>
        {user ? (
          <>
            <input name="displayName" value={form.displayName} onChange={handleChange} />
            <input name="id" value={form.id} onChange={handleChange} />
            <input name="pin" value={form.pin} onChange={handleChange} />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="admin">admin</option>
              <option value="developer">developer</option>
              <option value="employee">employee</option>
              <option value="user">user</option>
            </select>
            <button onClick={handleSave}>保存</button>
          </>
        ) : (
          <p>読み込み中...</p>
        )}
      </Layout>
    </ProtectedRoute>
  );
}

export default UserEdit;
