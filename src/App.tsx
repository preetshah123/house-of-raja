import './App.css';
import { StickyLogo } from './components/StickyLogo';
import { CloudLayer } from './components/CloudLayer';
import { HeroSection } from './components/HeroSection';
import { CastleSection } from './components/CastleSection';
import { SignUpForm } from './components/SignUpForm';
import { BottomBorder } from './components/BottomBorder';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    console.log(`Initial Window Size: ${width}px wide x ${height}px high`);

    // scrollHeight & scrollWidth capture the entire document bounds, including non-visible areas
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;
    
    console.log(`Total Canvas Size: ${pageWidth}px width x ${pageHeight}px height`);
  }, []);

  return (
    <div className="app-container">
      <StickyLogo />
      <CloudLayer>
        <HeroSection />
        <CastleSection>
          <SignUpForm />
        </CastleSection>
        <BottomBorder />
      </CloudLayer>
    </div>
  );
}

export default App;
