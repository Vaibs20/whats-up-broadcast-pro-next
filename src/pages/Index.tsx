
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { OAuthTest } from "@/components/OAuthTest";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your WhatsApp campaigns today.
            </p>
          </div>
        </div>
        
        {/* OAuth Test Component - Remove this after testing */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            OAuth Testing Panel (Remove after testing)
          </h3>
          <OAuthTest />
        </div>
        
        <Dashboard />
      </div>
    </Layout>
  );
}
