import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import formidable, { IncomingForm, Fields, Files, File } from 'formidable';
import { prisma } from '@/lib/prisma';
import path from 'path';
import { mkdir, readFile as fsReadFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormFields = {
  title?: string[];
  authors?: string[];
  abstract?: string[];
};

type FormFiles = {
  pdf?: File | File[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const tempDir = path.join(process.cwd(), 'tmp');
  await mkdir(tempDir, { recursive: true }); // ✅ Ensure tmp dir exists

  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    uploadDir: tempDir,
  });

  try {
    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const typedFields = fields as FormFields;
    const typedFiles = files as FormFiles;

    const title = typedFields.title?.[0] || '';
    const authors = typedFields.authors?.[0] || '';
    const abstract = typedFields.abstract?.[0] || '';

    const pdfFile = Array.isArray(typedFiles.pdf) ? typedFiles.pdf[0] : typedFiles.pdf;
    if (!title || !authors || !pdfFile) {
      return res.status(400).json({ error: 'Missing required fields: title, authors, or pdf' });
    }

    const pdfDir = path.join(process.cwd(), 'public/uploads/pdfs');
    await mkdir(pdfDir, { recursive: true });

    const pdfName = `${uuidv4()}${path.extname(pdfFile.originalFilename || '.pdf')}`;
    const pdfPath = path.join(pdfDir, pdfName);

    const pdfBuffer = await fsReadFile(pdfFile.filepath);
    await writeFile(pdfPath, pdfBuffer);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.article.create({
      data: {
        title,
        authors,
        abstract: abstract || null,
        slug: `${title.toLowerCase().replace(/\s+/g, '-')}-${uuidv4()}`,
        fileUrl: `/uploads/pdfs/${pdfName}`,
        publisherId: user.id,
        // issueId: 'unassigned',
        paymentVerified: false,
        status: 'DRAFT',
      },
    });


    return res.status(200).json({ message: 'Article uploaded successfully' });
  } catch (error) {
    console.error('[UPLOAD_ARTICLE_ERROR]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
