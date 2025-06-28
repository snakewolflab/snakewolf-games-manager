import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function AdminPortal() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <div>アドミンポータル</div>
      </Layout>
    </ProtectedRoute>
  );
}
export default AdminPortal;
