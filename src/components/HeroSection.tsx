import './styles/HeroSection.css';
import { useState, useEffect } from 'react';
import { HeroSectionProps } from '../types';

export const HeroSection = ({ children }: HeroSectionProps) => {
	const [scrollProgress, setScrollProgress] = useState(0);
	
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

		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

  return (
    <div className="hero-section"
			style={{
				// Multiplier of 3 means it hits 0 opacity when scrollProgress reaches 0.33 (33% down the page)
				opacity: Math.max(1 - scrollProgress * 2, 0),
			}}
		>
      <div className="hero-content">
        <h1 className="hero-heading">
          Your Home deserves better than beige.
        </h1>
        <p className="subtext">
          Indo-Western décor for homes that refuse to be basic.
        </p>
        <p className="italics">
          Built by artists, for people who actually live in their spaces.
        </p>
      </div>
      {children}
    </div>
  );
};

export default HeroSection;
