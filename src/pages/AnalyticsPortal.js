import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function AnalyticsPortal() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'developer', 'employee']}>
      <Layout>
        <h1>アナリティクスポータル</h1>
      </Layout>
    </ProtectedRoute>
  );
}

export default AnalyticsPortal;