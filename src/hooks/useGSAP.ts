import { useEffect, useState } from 'react';

export function useGSAP() {
  const [gsap, setGsap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        setGsap(gsap);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadGSAP();
  }, []);

  return { gsap, isLoaded };
} 