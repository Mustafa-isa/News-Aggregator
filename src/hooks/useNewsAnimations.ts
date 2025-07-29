import { useEffect } from 'react';
import { useGSAP } from './useGSAP';

interface UseNewsAnimationsProps {
  isClient: boolean;
  headerRef: React.RefObject<HTMLElement | null>;
  searchSectionRef: React.RefObject<HTMLElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  filteredArticles: any[];
}

export function useNewsAnimations({
  isClient,
  headerRef,
  searchSectionRef,
  cardsRef,
  searchInputRef,
  filteredArticles
}: UseNewsAnimationsProps) {
  const { gsap, isLoaded: gsapLoaded } = useGSAP();

  // Initial page load animations
  useEffect(() => {
    if (!isClient || !gsapLoaded || !gsap) return;

    const tl = gsap.timeline();
    
    // Header animation
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
    
    // Search section animation
    if (searchSectionRef.current) {
      tl.fromTo(searchSectionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }
    
    // Search input focus animation
    if (searchInputRef.current) {
      gsap.set(searchInputRef.current, { scale: 1 });
    }
  }, [isClient, gsapLoaded, gsap, headerRef, searchSectionRef, searchInputRef]);

  // Animate cards when they change
  useEffect(() => {
    if (!isClient || !gsapLoaded || !gsap || !cardsRef.current) return;

    const cards = cardsRef.current?.querySelectorAll('article');
    
    if (cards) {
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, [filteredArticles, isClient, gsapLoaded, gsap, cardsRef]);

  // Theme toggle animation
  useEffect(() => {
    if (!isClient || !gsapLoaded || !gsap) return;

    const themeButton = document.querySelector('[aria-label*="Switch to"]');
    if (themeButton) {
      gsap.fromTo(themeButton,
        { scale: 0.8, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isClient, gsapLoaded, gsap]);

  const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isClient || !gsapLoaded || !gsap) return;
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isClient || !gsapLoaded || !gsap) return;
    gsap.to(e.target, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
    if (!isClient || !gsapLoaded || !gsap) return;
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!isClient || !gsapLoaded || !gsap) return;
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCategoryClick = (categoryId: string, onCategoryChange: (id: string) => void) => {
    onCategoryChange(categoryId);
    
    if (!isClient || !gsapLoaded || !gsap) return;
    
    // Animate category buttons
    const buttons = document.querySelectorAll('[data-category]');
    gsap.to(buttons, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      stagger: 0.05,
      onComplete: () => {
        gsap.to(buttons, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    });
  };

  return {
    handleSearchFocus,
    handleSearchBlur,
    handleCardHover,
    handleCardLeave,
    handleCategoryClick
  };
} 