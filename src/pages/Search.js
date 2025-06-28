import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';

function SearchPage() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const snap = await getDocs(collection(db, 'games'));
      setGames(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.title?.toLowerCase().includes(query.toLowerCase()) ||
    game.id?.toLowerCase().includes(query.toLowerCase()) ||
    game.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Layout>
      <h1>ゲーム検索</h1>
      <input
        type="text"
        placeholder="タイトル・ID・タグで検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: 'calc(100% - 20px)',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      />
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredGames.map(game => (
          <div key={game.id} style={{ background: '#333', padding: '1rem', borderRadius: '10px' }}>
            <h2>{game.title}</h2>
            <p>ID: {game.id}</p>
            <p>価格: ¥{game.price}</p>
            <p>タグ: {game.tags?.join(', ')}</p>
          </div>
        ))}
        {filteredGames.length === 0 && <p>該当するゲームが見つかりません。</p>}
      </div>
    </Layout>
  );
}

export default SearchPage;
