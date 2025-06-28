import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) return <p>読み込み中...</p>;
  if (!user || !allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;