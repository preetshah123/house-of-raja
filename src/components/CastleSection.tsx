import './styles/CastleSection.css';
import castleEntrance from '../assets/castle-entrance.png';
import { CastleSectionProps } from '../types';

export const CastleSection = ({ children }: CastleSectionProps) => {
  return (
    <div className="castle-section">
      <div className="castle-background">
        <img
          src={castleEntrance}
          alt="castle entrance"
          className="castle-image"
        />
      </div>
      <div className="castle-form-overlay">
        {children}
      </div>
    </div>
  );
};

export default CastleSection;
