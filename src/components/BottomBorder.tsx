import './styles/BottomBorder.css';
import bottomBorder from '../assets/bottom-border.png';
import { BottomBorderProps } from '../types';

export const BottomBorder = ({ imageUrl, alt = 'bottom border' }: BottomBorderProps) => {
  return (
    <div id="bottom-sentinel" className="bottom-border-wrapper">
      <img
        src={imageUrl || bottomBorder}
        alt={alt}
        className="bottom-border-image"
      />
    </div>
  );
};

export default BottomBorder;
