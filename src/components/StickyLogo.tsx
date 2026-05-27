import { useEffect, useState } from 'react';
import './styles/StickyLogo.css';
import mainLogo from '../assets/main-logo.png';

export const StickyLogo = () => {
  const [transformStyles, setTransformStyles] = useState({
    scale: 1,
    translateY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate the maximum scrollable height of the current page
      const totalPageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScrollableDepth = totalPageHeight - viewportHeight;

      // Guard against division by zero on short pages that don't scroll
      if (maxScrollableDepth <= 0) return;

      // Calculate progress ratio (exactly 0 at top, exactly 1 at the absolute bottom)
      const progress = Math.min(scrollY / maxScrollableDepth, 1);

      // Animation Targets
      const minScale = 0.80;      // Shrinks down to 80% size at the bottom
      const maxTranslateY = 150;   // Moves 50px lower at the bottom

      // Interpolate values based on your scroll percentage
      const currentScale = 1 - (progress * (1 - minScale));
      const currentTranslateY = progress * maxTranslateY;

      setTransformStyles({
        scale: currentScale,
        translateY: currentTranslateY,
      });
    };

    // Run once on mount to establish correct sizing if page loads pre-scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Re-calculate if the user resizes their window (changes layout boundaries)
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="sticky-logo-wrapper">
      <div 
        className="sticky-logo-container"
        style={{
          transform: `translateY(${transformStyles.translateY}px) scale(${transformStyles.scale})`,
        }}
      >
        <img
          src={mainLogo}
          alt="Main Logo"
          className="sticky-logo-image"
        />
        <span className="text">HOUSE OF RAJA</span>
      </div>
    </div>
  );
};

export default StickyLogo;