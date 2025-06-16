"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import LoginModal from "@/components/loginform";

export default function InteractiveElements() {
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for auth query parameter
  useEffect(() => {
    const authParam = searchParams?.get("auth") ?? '';
    if (authParam === "visible") {
      setIsLoginModalOpen(true);
    }
  }, [searchParams]);
  

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    // Remove the query parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("auth");
    router.replace(url.pathname);
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
      
      {/* Simple Submission Modal */}
      {isSubmissionFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Submit Your Research</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Thank you for your interest in submitting to U-JOSET. Please email your manuscript to:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <a 
                  href="mailto:infoujoset@unicross.edu.ng" 
                  className="text-blue-600 font-medium hover:underline"
                >
                  infoujoset@unicross.edu.ng
                </a>
              </div>
              <Button 
                onClick={() => setIsSubmissionFormOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}