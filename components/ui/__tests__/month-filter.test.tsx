import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MonthFilter } from '../month-filter';

describe('MonthFilter Component', () => {
  const mockOnNextPeriod = jest.fn();
  const mockOnPreviousPeriod = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the current period correctly', () => {
    const currentPeriod = 'December 2023';
    render(
      <MonthFilter
        currentPeriod={currentPeriod}
        onNextPeriod={mockOnNextPeriod}
        onPreviousPeriod={mockOnPreviousPeriod}
      />
    );
    expect(screen.getByText('December 2023')).toBeInTheDocument();
  });

  it('calls onPreviousPeriod when the left arrow button is clicked', () => {
    const currentPeriod = 'January 2024';
    render(
      <MonthFilter
        currentPeriod={currentPeriod}
        onNextPeriod={mockOnNextPeriod}
        onPreviousPeriod={mockOnPreviousPeriod}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /chevron left/i }));
    expect(mockOnPreviousPeriod).toHaveBeenCalledTimes(1);
  });

  it('calls onNextPeriod when the right arrow button is clicked', () => {
    const currentPeriod = 'January 2024';
    render(
      <MonthFilter
        currentPeriod={currentPeriod}
        onNextPeriod={mockOnNextPeriod}
        onPreviousPeriod={mockOnPreviousPeriod}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /chevron right/i }));
    expect(mockOnNextPeriod).toHaveBeenCalledTimes(1);
  });
});
