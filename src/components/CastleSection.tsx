import { useEffect, useState, useRef } from 'react';
import './styles/CastleSection.css';
import castleEntrance from '../assets/castle-entrance.png';
import { CastleSectionProps } from '../types';

export const CastleSection = ({ children }: CastleSectionProps) => {
  const [translateY, setTranslateY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate when the section starts and ends in view
      const sectionStart = sectionTop;
      const sectionEnd = sectionTop + sectionHeight;

      // Calculate scroll progress relative to the section (0 = section top, 1 = section bottom)
      const scrollProgress = (scrollY - sectionStart + viewportHeight) / (sectionHeight + viewportHeight);
      
      // Clamp progress between 0 and 1
      const clampedProgress = Math.max(0, Math.min(scrollProgress * 1.5, 1));

      const displacement = -250 + clampedProgress * 250;
      setTranslateY(displacement);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="castle-section" ref={sectionRef}>
      <div className="castle-background">
        <img
          src={castleEntrance}
          alt="castle entrance"
          className="castle-image"
        />
      </div>
      <div
        className="castle-form-overlay"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CastleSection;
