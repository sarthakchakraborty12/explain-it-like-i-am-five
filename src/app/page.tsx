'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState, useRef} from 'react';
import {Geist, Geist_Mono} from 'next/font/google';
import {cn} from '@/lib/utils';
import {ModeToggle} from '@/components/mode-toggle';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icons} from "@/components/icons";
import Link from "next/link";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function LandingPage() {
  const [isSticky, setIsSticky] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGeminiClick = () => {
    setShowTooltip(true);

    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }

    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 3000); // Hide after 3 seconds
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="relative min-h-screen bg-background font-sans">
        {/* <div
          className={cn(
            'sticky top-0 z-20 w-full py-4 transition-colors',
            isSticky ? 'border-b bg-card' : 'bg-transparent',
          )}
        >
          <div className="container flex items-center justify-between">
            <p className="text-sm font-medium">Explain This Like I am Five :)</p>
            <ModeToggle />
          </div>
        </div> */}
        <main className="container relative flex flex-col items-center justify-center py-12">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Unlock the Power of Code Understanding
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Yes, you heard that right! There is a website that can explain your code and the errors
                you make while doing your code, so you don't have to stare at your PC for hours.
                Just chuck the code or error here and select the age in which you want to understand.
                It will explain it for you.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Button asChild>
                  <Link href="/explain">Explain Code</Link>
                </Button>
                <Button>
                  <Link href = "/error">Explain Error</Link></Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://www.dropbox.com/scl/fi/zu398xapone469i4jh4lq/codenerd.png.png?rlkey=kxme3khk0qsegcic3vv79zcew&st=1dmxf4n4&dl=1" // Placeholder image
                alt="Code Explanation Example"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Team Section */}
          <div className="w-full max-w-5xl mt-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Made with love by : </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://www.dropbox.com/scl/fi/di5z582mi6og2sgryva07/sarthakc.jpeg?rlkey=qnsx0dehg94c1lsh8iqgfdf31&st=bj5ewtjq&dl=1" alt="Sarthak Chakraborty" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <p className="font-semibold mt-2">Sarthak Chakraborty</p>
                <Link href="https://www.linkedin.com/in/sarthakchakraborty12/" className="text-sm text-muted-foreground hover:underline">
                  visit linkedIn profile →
                </Link>
              </div>

              {/* Team Member 2 */}
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://www.dropbox.com/scl/fi/rfgrhjobiwa1eykle9zvk/PARAG.jpg?rlkey=g9jfcxphg8cnlv4niacvq3gzt&st=5cdb3sjn&dl=1" alt="Parag Chowdhury" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <p className="font-semibold mt-2">Parag Chowdhury</p>
                <Link href="https://www.linkedin.com/in/parag-chowdhury-b3495928b/" className="text-sm text-muted-foreground hover:underline">
                  visit linkedIn profile →
                </Link>
              </div>

              {/* Team Member 3 */}
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://www.dropbox.com/scl/fi/yvbooogelslsxwruuh638/param.jpg?rlkey=c1ndqv1mgjb75qdkphzh8sky9&st=4p4bcvig&dl=1" alt="Parambrata Maitra" />
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                <p className="font-semibold mt-2">Parambrata Maitra</p>
                <Link href="https://www.linkedin.com/in/parambrata-maitra-65164126a/" className="text-sm text-muted-foreground hover:underline">
                  visit linkedIn profile →
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="w-full py-16 text-center text-muted-foreground relative">
           A smol and cute project, powered by <img
            src="https://www.dropbox.com/scl/fi/yqevj83xdarvudvpne88y/gemini.png?rlkey=lgiya4rggilzb50n5oq4msebc&st=gwmqvlma&dl=1"
            alt="Gemini"
            style={{ height: '1.2em', verticalAlign: 'middle', cursor: 'pointer', display: 'inline-block' }}
            onClick={handleGeminiClick}
          />
          {showTooltip && (
            <Card className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 z-10">
              <CardContent className="p-4 text-sm text-center">
                The AI Model used in this project is Gemini, which is a product of Google. "Gemini" is a trademark of Google LLC.
              </CardContent>
            </Card>
          )}
        </footer>
      </div>
    </div>
  );
}

