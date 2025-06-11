// app/login/page.tsx (Server Component by default)

import { BookOpen } from "lucide-react";
import LoginForm from "@/components/loginform";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="flex flex-col items-center mb-6">
        <BookOpen className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-2xl font-bold">Academic Journal System</h1>
        <p className="text-sm text-muted-foreground mt-1">Access the journal portal</p>
      </div>

      <LoginForm />
    </div>
  );
}
