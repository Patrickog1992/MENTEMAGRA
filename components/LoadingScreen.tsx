import React, { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 2000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-8 px-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Estamos analisando suas respostas e fazendo seu plano personalizado...
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-200 overflow-hidden relative">
        <div 
          className="bg-violet-600 h-4 rounded-full transition-all duration-75 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="font-bold text-violet-600 text-xl">{progress}%</p>

      <div className="bg-white p-6 rounded-2xl shadow-xl w-full border border-gray-100 transition-all duration-500 transform">
        <div className="flex justify-center mb-2 text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
        </div>
        <p className="text-gray-600 italic mb-4 min-h-[60px]">"{TESTIMONIALS[testimonialIndex].text}"</p>
        <p className="font-bold text-gray-800">- {TESTIMONIALS[testimonialIndex].name}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;