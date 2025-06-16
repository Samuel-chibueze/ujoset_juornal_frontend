import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  try {
    const journals = await prisma.journal.findMany({
      select: { id: true, name: true },
    });
    res.status(200).json({ journals });
  } catch (err) {
    console.error('Error loading journals:', err);
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
}
