// components/upload-button.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

export function UploadButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/upload')}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Upload Journal
    </Button>
  );
}
