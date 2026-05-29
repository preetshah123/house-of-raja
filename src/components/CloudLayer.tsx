import { useEffect, useState } from 'react';
import './styles/CloudLayer.css';
import cloud1 from '../assets/cloud-1.png';
import cloud2 from '../assets/cloud-2.png';
import { CloudLayerProps } from '../types';

interface CloudPosition {
  id: string;
  x: string;
  y: string;
  image: string;
  maxDeltaY: number; // Maximum pixels this specific cloud can travel upward
  customClass?: string;
}

const FIXED_CLOUDS_DESKTOP: CloudPosition[] = [
  // Top Left Edge Cluster (Pushed further on scroll)
  { id: 'cloud-top-left-1',  x: '10vw',  y: '-45vh', image: cloud1, maxDeltaY: 200, customClass: 'cloud-huge' },
  { id: 'cloud-mid-left-1',  x: '-10vw', y: '27vh',  image: cloud2, maxDeltaY: 800,  customClass: 'cloud-medium' },
  
  // Top Right Edge Cluster
  { id: 'cloud-top-right-1', x: '80vw',  y: '20vh',  image: cloud2, maxDeltaY: 800, customClass: 'cloud-large' },
  { id: 'cloud-mid-right-1', x: '60vw',  y: '40vh',  image: cloud1, maxDeltaY: 300,  customClass: 'cloud-huge' },
  
  // Bottom Corner Framers (Move slower/less distance to maintain background baseline structure)
  { id: 'cloud-bot-left',    x: '-10vw',  y: '40vh',  image: cloud1, maxDeltaY: 900,  customClass: 'cloud-massive' },
  { id: 'cloud-bot-right',   x: '10vw',  y: '100vh',  image: cloud2, maxDeltaY: 1000,  customClass: 'cloud-huge' },
];

// Mobile optimized cloud positions - further apart and higher up to avoid text
const FIXED_CLOUDS_MOBILE: CloudPosition[] = [
  // Top Left Edge Cluster - moved further left and up
  { id: 'cloud-top-left-1',  x: '-80vw',  y: '-30vh', image: cloud1, maxDeltaY: 135, customClass: 'cloud-huge-mobile' },
  { id: 'cloud-mid-left-1',  x: '-45vw', y: '20vh',  image: cloud2, maxDeltaY: 80,  customClass: 'cloud-medium-mobile' },
  
  // Top Right Edge Cluster - moved further right and up
  { id: 'cloud-top-right-1', x: '70vw',  y: '15vh',  image: cloud2, maxDeltaY: 110, customClass: 'cloud-large-mobile' },
  { id: 'cloud-mid-right-1', x: '20vw',  y: '30vh',  image: cloud1, maxDeltaY: 95,  customClass: 'cloud-huge-mobile' },
  
  // Bottom Corner Framers - adjusted for mobile spacing
  { id: 'cloud-bot-left',    x: '-40vw',  y: '40vh',  image: cloud1, maxDeltaY: 220,  customClass: 'cloud-massive-mobile' },
  { id: 'cloud-bot-right',   x: '-80vw',  y: '65vh',  image: cloud2, maxDeltaY: 520,  customClass: 'cloud-huge-mobile' },
];

const getCloudPositions = (isMobile: boolean): CloudPosition[] => {
  return isMobile ? FIXED_CLOUDS_MOBILE : FIXED_CLOUDS_DESKTOP;
};

export const CloudLayer = ({ children }: CloudLayerProps) => {
  // Track progress as a percentage multiplier (0 at top, 1 at bottom)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 650);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      const totalPageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScrollableDepth = totalPageHeight - viewportHeight;

      if (maxScrollableDepth <= 0) return;

      // Calculate progress between 0 and 1
      const progress = Math.min(scrollY / maxScrollableDepth, 1);
      
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
      handleScroll();
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cloudPositions = getCloudPositions(isMobile);

  return (
    <div className="cloud-layer">
      <div className="cloud-background-canvas">
        {cloudPositions.map((cloud) => {
          // Multiply this cloud's custom distance limit by the global scroll completion ratio
          const currentTranslateY = scrollProgress * cloud.maxDeltaY;

          return (
            <img
              key={cloud.id}
              src={cloud.image}
              alt=""
              className={`cloud-image ${cloud.customClass || ''}`}
              style={{
                // Subtracting currentTranslateY pulls the cloud UPWARD as scroll depth increases
                transform: `translate(${cloud.x}, calc(${cloud.y} - ${currentTranslateY}px))`,
              }}
            />
          );
        })}
      </div>
      
      <div className="cloud-content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default CloudLayer;