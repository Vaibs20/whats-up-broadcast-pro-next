
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare, CheckCircle, XCircle } from "lucide-react";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  
  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    
    console.log('AuthCallback - Token:', token ? 'Present' : 'Missing');
    console.log('AuthCallback - Error:', error || 'None');
    
    if (error) {
      console.error('OAuth Error:', error);
      setStatus('error');
      
      let errorMessage = 'Authentication failed';
      switch (error) {
        case 'oauth_failed':
          errorMessage = 'OAuth authentication was cancelled or failed';
          break;
        case 'token_generation_failed':
          errorMessage = 'Failed to generate authentication token';
          break;
        default:
          errorMessage = error;
      }
      
      toast({
        title: "Authentication Failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      setTimeout(() => navigate('/login'), 3000);
      return;
    }
    
    if (token) {
      console.log('Storing token and redirecting...');
      setStatus('success');
      
      // Store token and redirect
      localStorage.setItem('authToken', token);
      toast({
        title: "Welcome!",
        description: "You have been successfully logged in.",
      });
      
      // Reload to trigger auth context update
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      console.error('No token or error received');
      setStatus('error');
      toast({
        title: "Authentication Failed",
        description: "No authentication token received",
        variant: "destructive"
      });
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [searchParams, navigate, toast]);

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-600" />;
      default:
        return <Loader2 className="w-8 h-8 animate-spin text-blue-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Authentication successful! Redirecting...';
      case 'error':
        return 'Authentication failed. Redirecting to login...';
      default:
        return 'Completing authentication...';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          {getStatusIcon()}
          <span className="text-lg">{getStatusMessage()}</span>
        </div>
        <p className="text-gray-600">Please wait while we process your authentication.</p>
      </div>
    </div>
  );
}
