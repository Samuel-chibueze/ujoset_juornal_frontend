"use client";

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ Correct import

interface HeroCarouselProps {
  images: string[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter(); // ✅ Initialize the router

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToBrowse = () => {
    document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToJournals = () => {
    router.push('/journal'); // ✅ Route to the journals page
  };

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Academic research ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
            🏛️ University of Cross River State
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            UNICROSS JOSET
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Advancing Knowledge Through Academic Excellence — a modern platform for publishing groundbreaking research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={()=>router.push('/dashboard')} // ✅ Add onClick for routing
            >
              Submit Your Research
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={goToJournals}
            >
              Browse Journals
            </Button>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
