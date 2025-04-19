'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import {useEffect, useState} from "react";
import {metadata} from "@/app/metadata";
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export {metadata}; - removed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSticky, setIsSticky] = useState(false);
  const [title, setTitle] = useState(
    <>
      Explain this Like I am Five :)
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (value: string) => {
    if (value === "code") {
      setTitle(
        <>
          Explain this <span className="text-green-700">&lt;code&gt;</span> Like I am Five :)
        </>
      );
    } else if (value === "error") {
      setTitle(
        <>
          Explain this <span className="text-red-500">[error]</span> Like I am Five :)
        </>
      );
    }
  };

  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  useEffect(() => {
    if (pathname === '/error') {
      handleTabChange('error');
    } else {
      handleTabChange('code');
    }
  }, [pathname]);

  const defaultValue = pathname === '/error' ? 'error' : 'code';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative min-h-screen">
          <div
            className={`sticky top-0 z-10 py-4 transition-colors ${
              isSticky ? 'bg-card shadow-md' : 'bg-transparent'
            }`}
          >
            <h1 className="text-3xl font-extrabold text-center text-foreground">
              {title}
            </h1>
            {!isLandingPage && (
              <div className="flex justify-center">
                <Tabs defaultValue={defaultValue} className="w-[90%] max-w-3xl relative" onValueChange={handleTabChange}>
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
            )}
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}

