import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders Browse heading', () => {
  render(<AuthProvider><App /></AuthProvider>);
  const heading = screen.getByText(/Browse/i);
  expect(heading).toBeInTheDocument();
});
