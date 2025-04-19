'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface CodeErrorLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export default function CodeErrorLayout({ children, title }: CodeErrorLayoutProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-10 py-4 transition-colors ${
        isSticky ? 'bg-card shadow-md' : 'bg-transparent'
      }`}
    >
      <h1 className="text-3xl font-extrabold text-center text-foreground">
        {title}
      </h1>
      <div className="flex justify-center">
        <Tabs defaultValue="code" className="w-[90%] max-w-3xl relative">
          <TabsList className="flex p-0 space-x-4 bg-transparent">
            <TabsTrigger value="code" className="data-[state=active]:text-accent data-[state=active]:underline data-[state=active]:decoration-2 data-[state=active]:underline-offset-4 text-md font-semibold transition-colors focus:outline-none px-2 py-1 rounded-none">
              <Link href="/explain" className="w-full">
                Explain Code
              </Link>
            </TabsTrigger>
            <TabsTrigger value="error" className="data-[state=active]:text-accent data-[state=active]:underline data-[state=active]:decoration-2 data-[state=active]:underline-offset-4 text-md font-semibold transition-colors focus:outline-none px-2 py-1 rounded-none">
              <Link href="/error" className="w-full">
                Explain Error
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
}
