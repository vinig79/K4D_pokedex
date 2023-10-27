import { render, fireEvent, screen } from '@testing-library/react';
import Footer from './Footer.tsx';

describe('Footer component', () => {
  const mockSetOffset = jest.fn();

  beforeEach(() => {
    render(
      <Footer limit={10} total={100} offset={0} setOffset={mockSetOffset} />
    );
  });

  test('renders Back and Next', () => {
    const backButton = screen.getByAltText('Back');
    const nextButton = screen.getByAltText('Next');
    expect(backButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });

  test('handles click', () => {
    const backButton = screen.getByAltText('Back');
    const nextButton = screen.getByAltText('Next');

    fireEvent.click(backButton);
    fireEvent.click(nextButton);

    expect(mockSetOffset).toHaveBeenCalledTimes(2);
  });
});
