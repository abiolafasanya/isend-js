import { render, screen } from '@testing-library/react';
// import App from './App';
import { MemoryRouter } from 'react-router-dom';
import Login from './scenes/auth/Login/Login';
import Dashboard from './scenes/dashboard/Dashboard';

describe('login page', () => {
 it('should render login page', async() => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
 })

 it('should render dashboard page', async() => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
 })
});
