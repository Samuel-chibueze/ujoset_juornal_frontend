"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, FolderOpen } from 'lucide-react';
import { useAuthStore, useJournalStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { JournalCard } from '@/components/journal-card';
import { useSession } from "next-auth/react";


export default function DashboardPage() {

  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  
  const { journals } = useJournalStore();
  const router = useRouter();

  // Filter journals to only show the current user's journals
  const userJournals = journals.filter(
    (journal) => journal.userId === user?.id
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role === 'ADMIN') {
      router.push('/admin');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
            <p className="text-muted-foreground mt-1">
              Manage your journal submissions
            </p>
          </div>
          
          <Button 
            onClick={() => router.push('/upload')} 
            className="mt-4 md:mt-0"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Journal
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Journals</h2>
            
            {userJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userJournals.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/10">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No journals yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your first journal to get started
                </p>
                <Button 
                  onClick={() => router.push('/upload')}
                  variant="outline"
                >
                  Upload Journal
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}