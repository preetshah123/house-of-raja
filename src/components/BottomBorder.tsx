import { useState, useEffect } from 'react';
import './styles/BottomBorder.css';
import bottomBorder from '../assets/full_border.png';
import bottomBorderDesktop from '../assets/bottom-border.png'
import { BottomBorderProps } from '../types';

export const BottomBorder = ({ alt = 'bottom border' }: BottomBorderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 650);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="bottom-sentinel" className="bottom-border-wrapper">
      <img
        src={isMobile ? bottomBorder : bottomBorderDesktop}
        alt={alt}
        className="bottom-border-image"
      />
    </div>
  );
};

export default BottomBorder;
