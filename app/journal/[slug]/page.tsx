import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Calendar, FileText, ChevronDown, ChevronRight, Upload } from 'lucide-react';
import { useState } from 'react';

interface VolumeAccordionProps {
  volume: any;
  journalSlug: string;
}

function VolumeAccordion({ volume, journalSlug }: VolumeAccordionProps) {
  return (
    <details className="group border border-gray-200 rounded-lg mb-4">
      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
          <div>
            <h3 className="font-semibold text-gray-900">
              Volume {volume.number} ({volume.year})
            </h3>
            <p className="text-sm text-gray-500">
              {volume.issues.length} issue{volume.issues.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Calendar className="w-5 h-5 text-gray-400" />
      </summary>

      <div className="px-4 pb-4">
        <div className="border-t pt-4">
          {volume.issues.length > 0 ? (
            <div className="space-y-2">
              {volume.issues.map((issue: any) => (
                <Link
                  key={issue.id}
                  href={`/journal/${journalSlug}/${volume.number}/${issue.number}`}
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Issue {issue.number}
                        {issue.title && `: ${issue.title}`}
                      </h4>
                      {issue.month && (
                        <p className="text-sm text-gray-500">
                          {new Date(volume.year, issue.month - 1).toLocaleString('default', { month: 'long' })} {volume.year}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FileText className="w-4 h-4" />
                      <span>{issue._count.articles} articles</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No issues published yet</p>
          )}
        </div>
      </div>
    </details>
  );
}

export default async function JournalPage({ params }: { params: { slug: string } }) {
  const journal = await prisma.journal.findUnique({
    where: { slug: params.slug },
    include: {
      volumes: {
        include: {
          issues: {
            include: {
              _count: {
                select: { articles: true }
              }
            },
            orderBy: { number: 'desc' }
          }
        },
        orderBy: { year: 'desc' }
      }
    }
  });

  if (!journal) {
    notFound();
  }

  const totalArticles = journal.volumes.reduce((acc, volume) =>
    acc + volume.issues.reduce((issueAcc, issue) =>
      issueAcc + issue._count.articles, 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {journal.name}
              </h1>
              {journal.issn && (
                <p className="text-lg text-gray-600 mb-4">
                  ISSN: {journal.issn}
                </p>
              )}
              {journal.description && (
                <p className="text-gray-700 leading-relaxed">
                  {journal.description}
                </p>
              )}
            </div>
            <BookOpen className="w-12 h-12 text-blue-500 flex-shrink-0 ml-6" />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{journal.volumes.length} volumes published</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{totalArticles} total articles</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/upload`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Upload className="w-4 h-4" />
              Submit Article to this Journal
            </Link>
          </div>
        </div>

        {/* Volumes and Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Volumes & Issues</h2>

            {journal.volumes.length > 0 ? (
              <div>
                {journal.volumes.map((volume) => (
                  <VolumeAccordion
                    key={volume.id}
                    volume={volume}
                    journalSlug={journal.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No volumes published yet</h3>
                <p className="text-gray-600">
                  Volumes and issues will appear here once they are published.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About this Journal</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  This is a peer-reviewed academic journal publishing high-quality research
                  articles, reviews, and scholarly communications.
                </p>
                <p>
                  All submissions undergo rigorous peer review to ensure academic excellence
                  and contribute meaningfully to the field.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Guidelines</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Articles must be original and unpublished</p>
                <p>• Follow APA citation style</p>
                <p>• Include abstract (150-250 words)</p>
                <p>• Provide author information and affiliations</p>
                <p>• Submit in PDF format</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}