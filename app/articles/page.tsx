// app/articles/page.tsx
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function ArticlesPage() {
  const featuredArticles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12,
    include: { issue: true }
  });

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid md:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {article.issue?.title || 'general issue'}
                  </Badge>
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-3">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 italic">{article.authors}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>📅 {new Date(article.createdAt).toLocaleDateString()}</span>
                  <span>⬇️ Download</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
