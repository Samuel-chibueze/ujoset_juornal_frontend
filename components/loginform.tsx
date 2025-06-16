"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2, X, Shield } from "lucide-react";

// Google Icon SVG Component
const GoogleIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginForm({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [isOpen]);

  // const handleGoogleLogin = () => {
  //   setLoading(true);
  //   setError("");
  //   setSuccess("");
    
  //   // Simulate Google OAuth flow
  //   setTimeout(() => {
  //     // Simulate random success/failure for demo
  //     const isSuccess = Math.random() > 0.2; // 80% success rate
      
  //     if (isSuccess) {
  //       setSuccess("Successfully signed in with Google! Redirecting...");
        
  //       // Store user data in localStorage (in real app, this would come from Google OAuth)
  //       localStorage.setItem("user", JSON.stringify({
  //         email: "user@gmail.com",
  //         role: "user",
  //         loginTime: new Date().toISOString(),
  //         provider: "google",
  //         name: "John Doe"
  //       }));

  //       setTimeout(() => {
  //         onClose();
  //         router.push("/dashboard");
  //       }, 1500);
  //     } else {
  //       setError("Google authentication failed. Please try again.");
  //       setLoading(false);
  //     }
  //   }, 2000);
  // };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      setError("Google authentication failed. Please try again.");
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] p-0 border-0 overflow-hidden bg-white rounded-3xl shadow-2xl w-[380px]">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r bg-blue-500  p-8 text-white relative ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white mb-2">
                Welcome
              </DialogTitle>
              <p className="text-white/90 text-lg">
                Sign in to continue to your account
              </p>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sign in with Google
            </h3>
            <p className="text-gray-600">
              Use your Google account to access all features
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-green-700">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            </div>
          )}

          {/* Google Sign In Button */}
          <Button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            variant="outline"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="text-lg">Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <GoogleIcon className="h-6 w-6" />
                <span className="text-lg font-medium">Continue with Google</span>
              </div>
            )}
          </Button>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Secure Authentication
                </h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Your data is protected with Google's enterprise-grade security. 
                  We never store your Google password.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}