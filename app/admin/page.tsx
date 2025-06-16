import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { AdminDashboard } from '@/components/admin-dashboard';

const prisma = new PrismaClient();

async function getAdminData() {
  const [journals, articles] = await Promise.all([
    prisma.journal.findMany({
      include: {
        volumes: {
          include: {
            issues: {
              include: {
                articles: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.article.findMany({
      include: {
        issue: {
          include: {
            volume: {
              include: {
                journal: true
              }
            }
          }
        },
        publisher: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return { journals, articles };
}

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session?.user) {
    console.log(session?.user, session?.user.role)
    redirect('/login');
  }

  const { journals, articles } = await getAdminData();

  return <AdminDashboard journals={journals} articles={articles} />;
}