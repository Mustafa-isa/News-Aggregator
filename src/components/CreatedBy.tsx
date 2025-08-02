'use client';
import { useRef, useEffect } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import { useTheme } from '../contexts/ThemeContext';

interface CreatedByProps {
  className?: string;
}

export default function CreatedBy({ className = '' }: CreatedByProps) {
  const { gsap } = useGSAP();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { theme } = useTheme();

  const textClasses = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  useEffect(() => {
    if (!gsap || !containerRef.current || !textRef.current) return;

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Initial state
    gsap.set(textRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.8
    });

    // Animate the text in
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .to(textRef.current, {
      y: -5,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    }, '-=0.4')
    .to(textRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Add hover animation
    const handleMouseEnter = () => {
      gsap.to(textRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(textRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const element = textRef.current;
    element?.addEventListener('mouseenter', handleMouseEnter);
    element?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element?.removeEventListener('mouseenter', handleMouseEnter);
      element?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gsap, theme]);

  return (
    <div ref={containerRef} className={`mt-2 ${className}`}>
      <span 
        ref={textRef}
        className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${textClasses} hover:text-blue-500`}
      >
        Created By Mustafa Eisa
      </span>
    </div>
  );
} 