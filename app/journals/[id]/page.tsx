'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FileText, Calendar, User, Download, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { mockJournals } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function JournalPage() {
  const params = useParams();
  const router = useRouter();
  // const { journals } = useJournalStore();

  const journalId = params?.id?.toString();
  const [journal, setJournal] = useState(() =>
    journalId ? mockJournals.find(j => j.id === journalId) : undefined
  );

  useEffect(() => {
    if (!journal) {
      router.push('/journals');
    }
  }, [journal, router]);

  if (!journal) return null;

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'destructive';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen flex flex-col mb-20">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journals
        </Button>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {/* Title and Status */}
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl font-bold">{journal.title}</h1>
            <Badge variant={getBadgeVariant(journal.status)}>{journal.status}</Badge>
          </div>

          {/* Image */}
          {journal.imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={journal.imageUrl}
                alt="Journal Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          {journal.description && (
            <div>
              <h2 className="text-lg font-semibold mb-1">Description</h2>
              <p className="text-muted-foreground">{journal.description}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Publisher ID: {journal.publisherId}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Created: {format(new Date(journal.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>PDF: {journal.pdfUrl}</span>
            </div>
          </div>

          {/* Abstract */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Abstract</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{journal.abstract}</p>
          </div>

          {/* Download Button (only if Approved) */}
          {journal.status === 'Approved' && journal.pdfUrl && (
            <a
              href={journal.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button className="mt-4">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
