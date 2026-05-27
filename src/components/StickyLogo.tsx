import { useEffect, useState } from 'react';
import './styles/StickyLogo.css';
import mainLogo from '../assets/main-logo.png';

export const StickyLogo = () => {
  const [transformStyles, setTransformStyles] = useState({
    scale: 1,
    translateY: 0,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [maxTranslateY, setMaxTranslateY] = useState(220);

  useEffect(() => {
    const calculateMaxTranslateY = () => {
      const viewportHeight = window.innerHeight;
      
      // Determine desired distance from bottom based on screen size
      // On mobile, give more breathing room; on desktop, less
      const isMobileScreen = window.innerWidth <= 768;

      const calculatedMaxTranslateY = viewportHeight * 0.25;
      
      setMaxTranslateY(calculatedMaxTranslateY);
      setIsMobile(isMobileScreen);
    };

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

      // Animation Targets - scale adjustment based on screen size
      const minScale = isMobile ? 0.75 : 0.80;

      // Interpolate values based on your scroll percentage
      const currentScale = 1 - (progress * (1 - minScale));
      const currentTranslateY = progress * maxTranslateY;

      setTransformStyles({
        scale: currentScale,
        translateY: currentTranslateY,
      });
    };

    const handleResize = () => {
      calculateMaxTranslateY();
      handleScroll();
    };

    // Calculate on mount
    calculateMaxTranslateY();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, maxTranslateY]);

  return (
    <div className="sticky-logo-wrapper">
      <div 
        className="sticky-logo-container"
        style={{
          transform: `translateY(${transformStyles.translateY}px)`,
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