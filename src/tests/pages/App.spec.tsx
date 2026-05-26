import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('Initial Setup Verification', () => {
  it('renders the core application interface', () => {
    render(<App />);
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });
});