
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CheckCircle, 
  XCircle, 
  Loader2,
  Mail,
  Github,
  AlertCircle
} from "lucide-react";

export function OAuthTest() {
  const { user, isAuthenticated, loading } = useAuth();

  const handleGoogleLogin = () => {
    console.log('Initiating Google OAuth...');
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/google`;
  };

  const handleGithubLogin = () => {
    console.log('Initiating GitHub OAuth...');
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/github`;
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Checking auth status...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          OAuth Test Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Auth Status */}
        <div className="flex items-center justify-between">
          <span>Authentication Status:</span>
          {isAuthenticated ? (
            <Badge variant="default" className="bg-green-100 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Authenticated
            </Badge>
          ) : (
            <Badge variant="destructive">
              <XCircle className="w-3 h-3 mr-1" />
              Not Authenticated
            </Badge>
          )}
        </div>

        {/* User Info */}
        {user && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium">User Information:</div>
            <div className="text-xs space-y-1">
              <div>Name: {user.fullName}</div>
              <div>Email: {user.email}</div>
              <div>ID: {user._id}</div>
              {user.googleId && <div>Google ID: {user.googleId}</div>}
              {user.githubId && <div>GitHub ID: {user.githubId}</div>}
            </div>
          </div>
        )}

        {/* OAuth Test Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            Test Google OAuth
          </Button>
          
          <Button
            onClick={handleGithubLogin}
            variant="outline"
            className="w-full"
          >
            <Github className="w-4 h-4 mr-2" />
            Test GitHub OAuth
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-600 space-y-1">
          <div className="font-medium">Testing Instructions:</div>
          <div>1. Click an OAuth button above</div>
          <div>2. Complete the OAuth flow</div>
          <div>3. You should be redirected back here</div>
          <div>4. Check that user info appears above</div>
        </div>
      </CardContent>
    </Card>
  );
}
