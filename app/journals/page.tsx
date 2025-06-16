import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { BookOpen, Calendar, FileText } from 'lucide-react';

export default async function JournalsPage() {
  const journals = await prisma.journal.findMany({
    include: {
      volumes: {
        include: {
          issues: {
            include: {
              _count: {
                select: { articles: true }
              }
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Academic Journals</h1>
          <p className="text-lg text-gray-600">
            Browse our collection of peer-reviewed academic journals
          </p>
        </div>

        {journals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => {
              const totalArticles = journal.volumes.reduce((acc, volume) => 
                acc + volume.issues.reduce((issueAcc, issue) => 
                  issueAcc + issue._count.articles, 0), 0);
              
              const totalIssues = journal.volumes.reduce((acc, volume) => 
                acc + volume.issues.length, 0);

              return (
                <Link 
                  key={journal.id} 
                  href={`/journals/${journal.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 p-6 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {journal.name}
                        </h3>
                        {journal.issn && (
                          <p className="text-sm text-gray-500 mt-1">
                            ISSN: {journal.issn}
                          </p>
                        )}
                      </div>
                      <BookOpen className="w-6 h-6 text-blue-500 flex-shrink-0 ml-2" />
                    </div>

                    {journal.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {journal.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{journal.volumes.length} volumes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{totalArticles} articles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No journals available</h3>
            <p className="text-gray-600">
              Journals will appear here once they are published.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}