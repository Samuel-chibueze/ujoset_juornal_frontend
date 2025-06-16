// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { FolderOpen, FileText, BadgeCheck, Clock, CircleDollarSign, Info } from 'lucide-react';
import { UploadButton } from '@/components/ui/upload-buton';
import clsx from 'clsx';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  if (session.user.role === 'ADMIN') {
    return redirect('/admin');
  }

  const articles = await prisma.article.findMany({
    where: { publisherId: session.user.id },
    include: { issue: true },
    orderBy: { createdAt: 'desc' },
  });

  const statusBadge = (status: string) => {
    const base = 'px-2 py-1 text-xs rounded-full font-semibold';
    switch (status) {
      case 'DRAFT': return clsx(base, 'bg-yellow-100 text-yellow-800');
      case 'REVIEW': return clsx(base, 'bg-blue-100 text-blue-800');
      case 'APPROVED': return clsx(base, 'bg-green-100 text-green-800');
      case 'REJECTED': return clsx(base, 'bg-red-100 text-red-800');
      default: return clsx(base, 'bg-gray-100 text-gray-700');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {session.user.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your article submissions and see detailed statuses.
            </p>
          </div>
          <UploadButton />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Your Articles</h2>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white shadow rounded-xl border p-5 space-y-3 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold truncate">{article.title}</h3>
                    <span className={statusBadge(article.status)}>{article.status}</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <strong>Slug:</strong> <span className="break-words">{article.slug}</span>
                  </div>

                  <p className="text-sm text-gray-600">
                    <strong>Authors:</strong> {article.authors}
                  </p>

                  {article.abstract && (
                    <p className="text-sm text-gray-600 line-clamp-4">
                      <strong>Abstract:</strong> {article.abstract}
                    </p>
                  )}

                  <div className="flex items-center text-sm gap-2 text-gray-500">
                    <FileText className="w-4 h-4" />
                    <a
                      href={article.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>

                  {article.paymentProof && (
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <CircleDollarSign className="w-4 h-4" />
                      <span className="break-words">Proof: {article.paymentProof}</span>
                    </div>
                  )}

                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4" />
                    Payment Verified: <strong>{article.paymentVerified ? 'Yes' : 'No'}</strong>
                  </div>

                  {article.issue?  (
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Issue: <span className="font-medium">{article.issue?.number}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 italic">
                      Issue: Not assigned yet
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-3 space-y-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Created: {new Date(article.createdAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated: {new Date(article.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/10">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No articles yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first article to get started
              </p>
              <UploadButton />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
