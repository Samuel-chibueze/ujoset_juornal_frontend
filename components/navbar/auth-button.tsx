"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const router = useRouter();

  const handleAuthClick = () => {
    router.push("/?auth=visible");
  };

  return (
    <Button
      onClick={handleAuthClick}
      className="bg-gradient-to-r bg-blue-700 hover:from-blue-500 hover:to-blue-300 text-white shadow-lg hover:shadow-xl transition-all duration-200"
    >
      Sign in / Sign up
    </Button>
  );
}