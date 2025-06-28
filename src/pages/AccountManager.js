import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function AccountManager() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map(doc => doc.data()));
    };
    fetchUsers();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Layout>
        <h1>ユーザー管理</h1>
        <table>
          <thead>
            <tr>
              <th>表示名</th>
              <th>PIN</th>
              <th>メール</th>
              <th>ロール</th>
              <th>残高</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.displayName}</td>
                <td className='blur'>{u.pin}</td>
                <td>{u.email}</td>
                <td>{u.role}({u.role == "admin" ? "管理者" : u.role == "developer" ? "開発者" : u.role == "employee" ? "社員" : u.role == "user" ? "ユーザー" : "不明"})</td>
                <td>{u.coin} 🪙</td>
                <td>{u.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </ProtectedRoute>
  );
}

export default AccountManager;
