import { useEffect, useState } from 'react';
import './styles/StickyLogo.css';
import smallerLogo from '../assets/smaller_logo.png'

export const StickyLogo = () => {
  const [transformStyles, setTransformStyles] = useState({
    scale: 1,
    translateY: 0,
  });

  useEffect(() => {
    const handleScrollAndResize = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const totalPageHeight = document.documentElement.scrollHeight;
      
      const isMobileScreen = viewportWidth <= 768;
      const maxScrollableDepth = totalPageHeight - viewportHeight;

      // Guard against division by zero on non-scrollable pages
      if (maxScrollableDepth <= 0) return;

      // Calculate progress ratio (0 to 1)
      const progress = Math.min(scrollY / maxScrollableDepth, 1);

      // Determine max displacement based on active viewport scale 
      const calculatedMaxTranslateY = viewportHeight * (isMobileScreen ? 0.25 : 0.17);

      // Animation Targets 
      const minScale = isMobileScreen ? 0.75 : 0.70;

      // Interpolate scale and layout drift coordinates
      const currentScale = 1 - (progress * (1 - minScale));
      const currentTranslateY = progress * calculatedMaxTranslateY;

      setTransformStyles({
        scale: currentScale,
        translateY: currentTranslateY,
      });
    };

    // Initialize layout immediately on mounting step
    handleScrollAndResize();

    // Attach listeners with passive flag set to true for smooth mobile thread handling
    window.addEventListener('scroll', handleScrollAndResize, { passive: true });
    window.addEventListener('resize', handleScrollAndResize);

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, []);

  return (
    <div className="sticky-logo-wrapper">
      <div 
        className="sticky-logo-container"
        style={{
          transform: `translate3d(0, ${transformStyles.translateY}px, 0) scale(${transformStyles.scale})`,
        }}
      >
        <img
          src={smallerLogo}
          alt="Main Logo"
          className="sticky-logo-image"
        />
        <span className="text">HOUSE RAJA</span>
      </div>
    </div>
  );
};

export default StickyLogo;