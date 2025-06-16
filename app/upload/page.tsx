// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Upload, FileText, X, Image as ImageIcon } from 'lucide-react';
// import { useAuthStore, useJournalStore } from '@/lib/store';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { useSession } from "next-auth/react";


// export default function UploadPage() {
//   const { data: session, status } = useSession();
//   // const isAuthenticated = status === 'authenticated';
//   const isAuthenticated = true
//   const user = 2
//   // const user = session?.user;
//   // const 
  
//   // const { isAuthenticated, user } = useAuthStore();
//   const { addJournal } = useJournalStore();
//   const router = useRouter();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [abstract, setAbstract] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [pdfFile, setPdfFile] = useState<File | null>(null);

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login');
//     } else if (user?.role === 'ADMIN') {
//       router.push('/admin');
//     }
//   }, [isAuthenticated, user, router]);

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setFile: React.Dispatch<React.SetStateAction<File | null>>
//   ) => {
//     if (e.target.files?.[0]) setFile(e.target.files[0]);
//   };

//   const removeFile = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
//     setFile(null);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newErrors: typeof errors = {};
//     if (!title.trim()) newErrors.title = 'Title is required';
//     if (!description.trim()) newErrors.description = 'Description is required';
//     if (!abstract.trim()) newErrors.abstract = 'Abstract is required';
//     if (!imageFile) newErrors.image = 'Image file is required';
//     if (!pdfFile) newErrors.pdf = 'PDF file is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (user) {
//       const fakeImageUrl = `/uploads/images/${imageFile?.name}`;
//       const fakePdfUrl = `/uploads/pdfs/${pdfFile?.name}`;

//       addJournal({
//         title,
//         description,
//         imageUrl: fakeImageUrl,
//         abstract,
//         pdfUrl: fakePdfUrl,
//         status: 'Pending',
//         publisherId: user?.id,
//       });



//       router.push('/dashboard');
//     }
//   };

//   if (!isAuthenticated || !user) return null;

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <h1 className="text-3xl font-bold tracking-tight mb-1">Upload Journal</h1>
//           <p className="text-muted-foreground mb-6">Submit your academic journal for review</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title */}
//             <div className="space-y-2">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter the journal title"
//                 className={errors.title ? 'border-destructive' : ''}
//               />
//               {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 placeholder="Brief description"
//                 className={errors.description ? 'border-destructive' : ''}
//               />
//               {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
//             </div>

//             {/* Abstract */}
//             <div className="space-y-2">
//               <Label htmlFor="abstract">Abstract</Label>
//               <Textarea
//                 id="abstract"
//                 value={abstract}
//                 onChange={(e) => setAbstract(e.target.value)}
//                 rows={5}
//                 placeholder="Write your abstract"
//                 className={errors.abstract ? 'border-destructive' : ''}
//               />
//               {errors.abstract && <p className="text-destructive text-sm">{errors.abstract}</p>}
//             </div>

//             {/* Image Upload */}
//             <div className="space-y-2">
//               <Label htmlFor="image-upload">Journal Cover Image</Label>
//               {!imageFile ? (
//                 <div className={`border-2 border-dashed p-6 rounded-md text-center ${errors.image ? 'border-destructive' : 'border-muted'}`}>
//                   <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
//                   <p className="text-sm text-muted-foreground mb-2">Upload a cover image</p>
//                   <Input
//                     id="image-upload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleFileChange(e, setImageFile)}
//                   />
//                   <Button type="button" variant="secondary" onClick={() => document.getElementById('image-upload')?.click()}>
//                     <Upload className="mr-2 h-4 w-4" /> Select Image
//                   </Button>
//                   {errors.image && <p className="text-destructive text-sm mt-2">{errors.image}</p>}
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-between border rounded-md p-3">
//                   <div className="flex items-center">
//                     <ImageIcon className="h-5 w-5 text-primary mr-2" />
//                     <span className="text-sm font-medium">{imageFile.name}</span>
//                   </div>
//                   <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(setImageFile)}>
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             {/* PDF Upload */}
//             <div className="space-y-2">
//               <Label htmlFor="pdf-upload">Upload PDF</Label>
//               {!pdfFile ? (
//                 <div className={`border-2 border-dashed p-6 rounded-md text-center ${errors.pdf ? 'border-destructive' : 'border-muted'}`}>
//                   <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
//                   <p className="text-sm text-muted-foreground mb-2">Upload the PDF of your journal</p>
//                   <Input
//                     id="pdf-upload"
//                     type="file"
//                     accept=".pdf"
//                     className="hidden"
//                     onChange={(e) => handleFileChange(e, setPdfFile)}
//                   />
//                   <Button type="button" variant="secondary" onClick={() => document.getElementById('pdf-upload')?.click()}>
//                     <Upload className="mr-2 h-4 w-4" /> Select PDF
//                   </Button>
//                   {errors.pdf && <p className="text-destructive text-sm mt-2">{errors.pdf}</p>}
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-between border rounded-md p-3">
//                   <div className="flex items-center">
//                     <FileText className="h-5 w-5 text-primary mr-2" />
//                     <span className="text-sm font-medium">{pdfFile.name}</span>
//                   </div>
//                   <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(setPdfFile)}>
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end gap-4 pt-4">
//               <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>
//                 Cancel
//               </Button>
//               <Button type="submit">Submit Journal</Button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }


import UploadForm from '@/components/UploadForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function UploadPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
