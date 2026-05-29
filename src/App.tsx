import './App.css';
import { StickyLogo } from './components/StickyLogo';
import { CloudLayer } from './components/CloudLayer';
import { HeroSection } from './components/HeroSection';
import { CastleSection } from './components/CastleSection';
import { SignUpForm } from './components/SignUpForm';
import { BottomBorder } from './components/BottomBorder';

function App() {
  return (
    <div className="app-container">
      <StickyLogo />
      <CloudLayer>
        <HeroSection />
        <div className='block'></div>
        <CastleSection>
          <SignUpForm />
        </CastleSection>
        <BottomBorder />
      </CloudLayer>
    </div>
  );
}

export default App;
