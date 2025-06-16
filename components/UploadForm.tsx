'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function UploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [description, setDescription] = useState('');
  const [abstract, setAbstract] = useState('');
//   const [issueId, setIssueId] = useState('');
  const [journalId, setJournalId] = useState('');
  const [journalOptions, setJournalOptions] = useState<{ id: string; name: string }[]>([]);

  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await fetch('/api/journal');
        const data = await res.json();
        setJournalOptions(data.journals);
      } catch (err) {
        console.error('Error loading journals:', err);
      }
    };
    fetchJournals();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const removeFile = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!authors.trim()) newErrors.authors = 'Authors are required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!abstract.trim()) newErrors.abstract = 'Abstract is required';
    // if (!issueId.trim()) newErrors.issueId = 'Issue ID is required';
    if (!journalId.trim()) newErrors.journalId = 'Journal selection is required';
    // if (!imageFile) newErrors.image = 'Image file is required';
    if (!pdfFile) newErrors.pdf = 'PDF file is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('authors', authors);
      formData.append('description', description);
      formData.append('abstract', abstract);
    //   formData.append('issueId', issueId);
      formData.append('journalId', journalId);
      // if (imageFile) formData.append('image', imageFile);
      if (pdfFile) formData.append('pdf', pdfFile);
      if (paymentProofFile) formData.append('paymentProof', paymentProofFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-10 container max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Upload Journal</h1>
      <p className="text-muted-foreground mb-6">Submit your academic journal for review</p>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Journal title"
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="authors">Authors</Label>
          <Input
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder="Author(s) name(s)"
            className={errors.authors ? 'border-destructive' : ''}
          />
          {errors.authors && <p className="text-destructive text-sm">{errors.authors}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Brief description"
            className={errors.description ? 'border-destructive' : ''}
          />
          {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows={5}
            placeholder="Your abstract..."
            className={errors.abstract ? 'border-destructive' : ''}
          />
          {errors.abstract && <p className="text-destructive text-sm">{errors.abstract}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="journalId">Select Journal</Label>
          <select
            id="journalId"
            value={journalId}
            onChange={(e) => setJournalId(e.target.value)}
            className={`w-full border rounded-md px-3 py-2 text-sm ${errors.journalId ? 'border-destructive' : 'border-input'}`}
          >
            <option value="">-- Choose a journal --</option>
            {journalOptions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name}
              </option>
            ))}
          </select>
          {errors.journalId && <p className="text-destructive text-sm">{errors.journalId}</p>}
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="issueId">Issue ID</Label>
          <Input
            id="issueId"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            placeholder="Issue ID"
            className={errors.issueId ? 'border-destructive' : ''}
          />
          {errors.issueId && <p className="text-destructive text-sm">{errors.issueId}</p>}
        </div> */}

        {/* Cover Image Upload */}
        {/* <div className="space-y-2">
          <Label htmlFor="image">Journal Cover Image</Label>
          {!imageFile ? (
            <div className={`border-2 border-dashed p-6 rounded-md text-center ${errors.image ? 'border-destructive' : 'border-muted'}`}>
              <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Upload a cover image</p>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setImageFile)}
              />
              <Button type="button" variant="secondary" onClick={() => document.getElementById('image')?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Select Image
              </Button>
              {errors.image && <p className="text-destructive text-sm mt-2">{errors.image}</p>}
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-center">
                <ImageIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">{imageFile.name}</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(setImageFile)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div> */}

        {/* PDF Upload */}
        <div className="space-y-2">
          <Label htmlFor="pdf">Upload PDF</Label>
          {!pdfFile ? (
            <div className={`border-2 border-dashed p-6 rounded-md text-center ${errors.pdf ? 'border-destructive' : 'border-muted'}`}>
              <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Upload the PDF of your journal</p>
              <Input
                id="pdf"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, setPdfFile)}
              />
              <Button type="button" variant="secondary" onClick={() => document.getElementById('pdf')?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Select PDF
              </Button>
              {errors.pdf && <p className="text-destructive text-sm mt-2">{errors.pdf}</p>}
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">{pdfFile.name}</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(setPdfFile)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Optional Payment Proof */}
        <div className="space-y-2">
          <Label htmlFor="paymentProof">Payment Proof (optional)</Label>
          {!paymentProofFile ? (
            <div className="border-2 border-dashed p-6 rounded-md text-center border-muted">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Upload a screenshot or receipt</p>
              <Input
                id="paymentProof"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setPaymentProofFile)}
              />
              <Button type="button" variant="secondary" onClick={() => document.getElementById('paymentProof')?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Select Proof
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">{paymentProofFile.name}</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(setPaymentProofFile)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {errors.general && <p className="text-destructive text-sm">{errors.general}</p>}

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Journal'}
          </Button>
        </div>
      </form>
    </main>
  );
}
