import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <App />
      </ThemeProvider>
    );
    // Check if the app renders with navigation
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByText('Ben Meeker').length).toBeGreaterThan(0);
  });
});

