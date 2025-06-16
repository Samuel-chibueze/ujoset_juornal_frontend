import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, Calendar, Users, BookOpen } from 'lucide-react';

export default async function IssuePage({ 
  params 
}: { 
  params: { slug: string; volume: string; issue: string } 
}) {
  // ✅ Strip prefixes safely
  const volumeMatch = params.volume?.match(/^vol-(\d+)$/);
  const issueMatch = params.issue?.match(/^iss-(\d+)$/);

  const volumeNumber = parseInt(params.volume);
  const issueNumber = parseInt(params.issue);
  
  if (isNaN(volumeNumber) || isNaN(issueNumber)) {
    console.error('Invalid volume or issue number from URL:', { volume: params.volume, issue: params.issue });
    notFound();
  }

  const issue = await prisma.issue.findFirst({
    where: {
      number: issueNumber,
      volume: {
        number: volumeNumber,
        journal: {
          slug: params.slug
        }
      }
    },
    include: {
      volume: {
        include: {
          journal: true
        }
      },
      articles: {
        where: {
          status: 'DRAFT'
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });

  if (!issue) {
    notFound();
  }

  const monthName = issue.month 
    ? new Date(issue.volume.year, issue.month - 1).toLocaleString('default', { month: 'long' })
    : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href={`/journal/${params.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {issue.volume.journal.name}
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">
                  {issue.volume.journal.name}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Volume {issue.volume.number}, Issue {issue.number}
              </h1>
              
              {issue.title && (
                <h2 className="text-xl text-gray-700 mb-3">
                  {issue.title}
                </h2>
              )}

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {monthName} {issue.volume.year}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{issue.articles.length} articles</span>
                </div>
              </div>
            </div>
          </div>

          {issue.volume.journal.issn && (
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                ISSN: {issue.volume.journal.issn}
              </p>
            </div>
          )}
        </div>

        {/* Articles */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Articles in this Issue</h2>
          </div>

          {issue.articles.length > 0 ? (
            <div className="divide-y">
              {issue.articles.map((article, index) => (
                <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                            {article.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{article.authors}</span>
                          </div>

                          {article.abstract && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Abstract</h4>
                              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {article.abstract}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-4">
                            <Link
                              href={`/articles/${article.slug}`}
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                            >
                              <FileText className="w-4 h-4" />
                              Read More
                            </Link>
                            
                            <a
                              href={article.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors font-medium"
                            >
                              <Download className="w-4 h-4" />
                              Download PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles published yet</h3>
              <p className="text-gray-600">
                Articles will appear here once they are published in this issue.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
