import { render, screen } from '@testing-library/react';
import TrainPage from './TrainPage';

test('renders learn react link', () => {
  render(<TrainPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
