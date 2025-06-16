import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // Adjust path if needed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'POST') {
      const { number, year, journalId } = req.body;

      const volume = await prisma.volume.create({
        data: {
          number: parseInt(number),
          year: parseInt(year),
          journalId,
        },
      });

      return res.status(200).json(volume);
    }

    if (req.method === 'PUT') {
      const { id, number, year } = req.body;

      const volume = await prisma.volume.update({
        where: { id },
        data: {
          number: parseInt(number),
          year: parseInt(year),
        },
      });

      return res.status(200).json(volume);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Volume ID required' });
      }

      await prisma.volume.delete({
        where: { id },
      });

      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error('[VOLUME_API_ERROR]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
