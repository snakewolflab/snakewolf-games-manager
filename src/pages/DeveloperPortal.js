import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function DeveloperPortal() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'developer']}>
      <Layout>
        <div>デベロッパーポータル</div>
      </Layout>
    </ProtectedRoute>
  );
}
export default DeveloperPortal;