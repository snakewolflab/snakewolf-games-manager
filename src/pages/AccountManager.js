// src/pages/AccountManager.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

function AccountManager() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const snap = await getDocs(collection(db, 'users'));
        setUsers(snap.docs.map(d => ({ ...d.data(), uid: d.id })));
    };

    const updateField = async (uid, field, value) => {
        await updateDoc(doc(db, 'users', uid), { [field]: value });
        fetchUsers();
    };

    const handleCoinChange = (uid, delta) => {
        const user = users.find(u => u.uid === uid);
        if (user) {
            updateField(uid, 'coin', Math.max((user.coin || 0) + delta, 0));
        }
    };

    const toggleBan = (uid, isBanned) => {
        updateField(uid, 'banned', !isBanned);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <Layout>
                <h1>ユーザー管理</h1>
                <div className='center'>
                    <table>
                        <thead>
                            <tr>
                                <th>表示名</th>
                                <th>メール</th>
                                <th>ロール</th>
                                <th>残高</th>
                                <th>ID</th>
                                <th>BAN</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr key={i} style={{ opacity: u.banned ? 0.5 : 1 }}>
                                    <td>{u.displayName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{u.coin} 🪙</td>
                                    <td>{u.id}</td>
                                    <td>{u.banned ? '✅' : '❌'}</td>
                                    <td>
                                        <button onClick={() => handleCoinChange(u.uid, +100)}>+100</button>
                                        <button onClick={() => handleCoinChange(u.uid, -100)}>-100</button>
                                        <button onClick={() => toggleBan(u.uid, u.banned)}>{u.banned ? '解除' : 'BAN'}</button>
                                        <button onClick={() => navigate(`/admin/user/${u.uid}`)}>編集</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </ProtectedRoute>
    );
}

export default AccountManager;