// pages/api/journal/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false, // Important: disable Next.js default body parser
  },
};

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form' });
    }

    try {
      const {
        title,
        description,
        abstract,
        publisherId,
      } = fields;

      const image = files.image?.[0] || files.image;
      const pdf = files.pdf?.[0] || files.pdf;

      const imageUrl = image ? `/public/uploads/images/${path.basename(image.filepath)}` : '';
      const pdfUrl = pdf ? `/public/uploads/pdf/${path.basename(pdf.filepath)}` : '';

      const newJournal = await prisma.journal.create({
        data: {
          id: crypto.randomUUID(),
          title: title as string,
          description: description as string,
          abstract: abstract as string,
          imageUrl,
          pdfUrl,
          status: 'Pending',
          publisherId: publisherId as string,
        },
      });

      return res.status(200).json({ message: 'Journal created successfully', journal: newJournal });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
}
