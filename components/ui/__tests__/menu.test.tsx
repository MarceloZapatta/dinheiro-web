import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Menu } from '../menu';
import { useMediaQuery } from '@/hooks/use-media-query';

// Mock the useMediaQuery hook
jest.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: jest.fn(),
}));

describe('Menu Component', () => {
  it('renders Movimentações and Relatório links', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Simulate desktop
    render(<Menu />);
    expect(screen.getByText('Movimentações')).toBeInTheDocument();
    expect(screen.getByText('Relatório')).toBeInTheDocument();
  });

  it('applies bottom-0 class on mobile', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // Simulate mobile
    render(<Menu />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('bottom-0');
    expect(navElement).not.toHaveClass('top-0');
  });

  it('applies top-0 class on desktop', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Simulate desktop
    render(<Menu />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('top-0');
    expect(navElement).not.toHaveClass('bottom-0');
  });
});
