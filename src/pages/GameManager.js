// src/pages/GameManager.jsx（ゲーム管理機能）
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function GameManager() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ title: '', id: '', price: 0 });

  const fetchGames = async () => {
    const snap = await getDocs(collection(db, 'games'));
    setGames(snap.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
  };

  const handleAdd = async () => {
    if (!newGame.title || !newGame.id) return;
    await addDoc(collection(db, 'games'), newGame);
    setNewGame({ title: '', id: '', price: 0 });
    fetchGames();
  };

  const handleDelete = async (docId) => {
    await deleteDoc(doc(db, 'games', docId));
    fetchGames();
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin", "developer"]}>
      <Layout>
        <h1>ゲーム管理</h1>
        <div>
          <input
            placeholder="ゲームID"
            value={newGame.id}
            onChange={(e) => setNewGame({ ...newGame, id: e.target.value })}
          />
          <input
            placeholder="タイトル"
            value={newGame.title}
            onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="価格"
            value={newGame.price}
            onChange={(e) => setNewGame({ ...newGame, price: parseInt(e.target.value) })}
          />
          <button onClick={handleAdd}>追加</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>タイトル</th>
              <th>価格</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g, i) => (
              <tr key={i}>
                <td>{g.id}</td>
                <td>{g.title}</td>
                <td>{g.price}円</td>
                <td>
                  <button onClick={() => handleDelete(g.docId)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </ProtectedRoute>
  );
}

export default GameManager;
