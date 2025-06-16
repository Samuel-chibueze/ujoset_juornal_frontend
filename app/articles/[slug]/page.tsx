import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Calendar, Users, BookOpen, FileText, Clock } from 'lucide-react';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);

  const article = await prisma.article.findUnique({
    where: {
      slug: decodedSlug,
    },
    include: {
      issue: {
        include: {
          volume: {
            include: {
              journal: true,
            },
          },
        },
      },
      publisher: true,
    },
  });

  if (!article || article.status !== 'DRAFT') {
    notFound();
  }

  const monthName = article.issue?.month 
    ? new Date(article.issue.volume.year, article.issue.month - 1).toLocaleString('default', { month: 'long' })
    : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        {article.issue && (
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link 
                href="/journals"
                className="hover:text-blue-600 transition-colors"
              >
                Journals
              </Link>
              <span>/</span>
              <Link 
                href={`/journals/${article.issue.volume.journal.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {article.issue.volume.journal.name}
              </Link>
              <span>/</span>
              <Link 
                href={`/journals/${article.issue.volume.journal.slug}/vol-${article.issue.volume.number}/iss-${article.issue.number}`}
                className="hover:text-blue-600 transition-colors"
              >
                Vol {article.issue.volume.number}, Issue {article.issue.number}
              </Link>
            </nav>
          </div>
        )}

        {/* Article Header */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Users className="w-5 h-5" />
              <span className="text-lg">{article.authors}</span>
            </div>

            {/* Journal Info */}
            {article.issue && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Published in {article.issue.volume.journal.name}
                    </p>
                    <p className="text-sm text-blue-700">
                      Volume {article.issue.volume.number}, Issue {article.issue.number}
                      {monthName && ` • ${monthName} ${article.issue.volume.year}`}
                      {article.issue.volume.journal.issn && ` • ISSN: ${article.issue.volume.journal.issn}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Download Button */}
            <div className="flex items-center gap-4">
              <a
                href={article.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>Submitted: {new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract */}
        {article.abstract && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {article.abstract}
              </p>
            </div>
          </div>
        )}

        {/* Article Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Publication Details */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publication Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Article ID:</span>
                <span className="font-mono text-gray-900">{article.id.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {article.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted:</span>
                <span className="text-gray-900">{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900">{new Date(article.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Author Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600 block mb-1">Authors:</span>
                <span className="text-gray-900 font-medium">{article.authors}</span>
              </div>
              {article.publisher.name && (
                <div>
                  <span className="text-gray-600 block mb-1">Corresponding Author:</span>
                  <span className="text-gray-900">{article.publisher.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Articles or Back to Journal */}
        {article.issue && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">More from this Issue</h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Explore other articles from Volume {article.issue.volume.number}, Issue {article.issue.number}
              </p>
              <Link
                href={`/journal/${article.issue.volume.journal.slug}/${article.issue.volume.number}/${article.issue.number}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                <FileText className="w-4 h-4" />
                View Issue
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}