"use client";

import { useEffect, useState } from "react";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

export function ScrollHeader({ children }: ScrollHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `sticky top-0 z-50 w-full transition-all duration-300 ${
    scrolled
      ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
      : "bg-white/80 backdrop-blur-sm border-b border-gray-100"
  }`;

  return (
    <header className={headerClasses}>
      {children}
    </header>
  );
}