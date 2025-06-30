// src/components/ui/SubSidebar.js
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import './SubSidebar.css';

export default function SubSidebar({ role, friends }) {
  const { currentUser } = useAuth();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [search, setSearch] = useState('');
  const [newFriendId, setNewFriendId] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);

  const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const onlineFriends = filteredFriends.filter(f => f.status === 'online');
  const offlineFriends = filteredFriends.filter(f => f.status !== 'online');

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return;
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const data = userDoc.data();
      setFriendRequests(data.friendRequests || []);
    };
    fetchRequests();
  }, [currentUser]);

  const handleSendRequest = async () => {
    if (!newFriendId || !currentUser?.uid) return;
    const targetRef = doc(db, 'users', newFriendId);
    const currentRef = doc(db, 'users', currentUser.uid);

    await updateDoc(targetRef, {
      friendRequests: arrayUnion(currentUser.uid)
    });
    await updateDoc(currentRef, {
      sentRequests: arrayUnion(newFriendId)
    });
    setNewFriendId('');
  };

  const handleAcceptRequest = async (fromId) => {
    const currentRef = doc(db, 'users', currentUser.uid);
    const fromRef = doc(db, 'users', fromId);

    await updateDoc(currentRef, {
      friendRequests: arrayRemove(fromId),
      friends: arrayUnion(fromId)
    });
    await updateDoc(fromRef, {
      sentRequests: arrayRemove(currentUser.uid),
      friends: arrayUnion(currentUser.uid)
    });

    setFriendRequests(friendRequests.filter(id => id !== fromId));
  };

  const handleRemoveFriend = async (id) => {
    if (!currentUser?.uid) return;
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      friends: arrayRemove(id)
    });
    setSelectedFriend(null);
  };

  return (
    <div className="subsidebar">
      <input
        className="friend-search"
        type="text"
        placeholder="フレンド検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {friendRequests.length > 0 && (
        <div className="section-label">リクエスト</div>
      )}
      {friendRequests.map(id => (
        <div key={id} className="friend-request">
          <span>{id}</span>
          <button onClick={() => handleAcceptRequest(id)}>承認</button>
        </div>
      ))}

      <div className="section-label">オンライン</div>
      {onlineFriends.map(friend => (
        <div
          key={friend.id}
          className="friend-item online"
          onClick={() => setSelectedFriend(friend)}
        >
          <div className="friend-avatar" />
          <span>{friend.name}</span>
        </div>
      ))}

      <div className="section-label">オフライン</div>
      {offlineFriends.map(friend => (
        <div
          key={friend.id}
          className="friend-item offline"
          onClick={() => setSelectedFriend(friend)}
        >
          <div className="friend-avatar" />
          <span>{friend.name}</span>
        </div>
      ))}

      <div className="add-friend-section">
        <input
          type="text"
          placeholder="ユーザーIDで申請"
          value={newFriendId}
          onChange={(e) => setNewFriendId(e.target.value)}
        />
        <button onClick={handleSendRequest}>申請</button>
      </div>

      {selectedFriend && (
        <div className="friend-modal" onClick={() => setSelectedFriend(null)}>
          <div className="friend-modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedFriend.name}</h3>
            <p>ステータス: {selectedFriend.status}</p>
            <p>ID: {selectedFriend.id}</p>
            <button onClick={() => handleRemoveFriend(selectedFriend.id)}>削除</button>
          </div>
        </div>
      )}
    </div>
  );
}
