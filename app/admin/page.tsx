"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useJournalStore } from '@/lib/store';
import { JournalCard } from '@/components/journal-card';
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
    const { journals } = useJournalStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null; // Don't render anything while redirecting
  }

  // Group journals by status
  const pendingJournals = journals.filter(j => j.status === 'Pending');
  const approvedJournals = journals.filter(j => j.status === 'Approved');
  const rejectedJournals = journals.filter(j => j.status === 'Rejected');

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage journal submissions
          </p>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Pending Reviews
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                {pendingJournals.length}
              </span>
            </h2>
            
            {pendingJournals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {pendingJournals.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} showActions={true} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4">No pending journals to review.</p>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Approved Journals
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {approvedJournals.length}
              </span>
            </h2>
            
            {approvedJournals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {approvedJournals.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4">No approved journals yet.</p>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Rejected Journals
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-red-100 text-red-800">
                {rejectedJournals.length}
              </span>
            </h2>
            
            {rejectedJournals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {rejectedJournals.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4">No rejected journals.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}