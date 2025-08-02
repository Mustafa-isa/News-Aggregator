import { useEffect } from 'react';
import { useGSAP } from './useGSAP';

interface UseNewsAnimationsProps {
  isClient: boolean;
  headerRef: React.RefObject<HTMLElement | null>;
  searchSectionRef: React.RefObject<HTMLElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  articles: any[];
}

export function useNewsAnimations({
  isClient,
  headerRef,
  searchSectionRef,
  cardsRef,
  searchInputRef,
  articles
}: UseNewsAnimationsProps) {
  const { gsap, isLoaded: gsapLoaded } = useGSAP();

  // Initial page load animations
  useEffect(() => {
    if (!isClient || !gsapLoaded || !gsap) return;

    const tl = gsap.timeline();
    
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
    
    if (searchSectionRef.current) {
      tl.fromTo(searchSectionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }
    
    if (searchInputRef.current) {
      gsap.set(searchInputRef.current, { scale: 1 });
    }
  }, [isClient, gsapLoaded, gsap, headerRef, searchSectionRef, searchInputRef]);

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
  }, [articles, isClient, gsapLoaded, gsap, cardsRef]);

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

  const handleSearchFocus = () => {
    if (!isClient || !gsapLoaded || !gsap || !searchInputRef.current) return;
    gsap.to(searchInputRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleSearchBlur = () => {
    if (!isClient || !gsapLoaded || !gsap || !searchInputRef.current) return;
    gsap.to(searchInputRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCardHover = (articleId: string) => {
    if (!isClient || !gsapLoaded || !gsap || !cardsRef.current) return;
    
    const card = cardsRef.current?.querySelector(`[data-article-id="${articleId}"]`);
    if (card) {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleCardLeave = () => {
    if (!isClient) return;
    
    // Reset card animations
    const cards = document.querySelectorAll('[data-article-id]');
    cards.forEach(card => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  };

  return {
    handleSearchFocus,
    handleSearchBlur,
    handleCardHover,
    handleCardLeave
  };
} 