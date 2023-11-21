import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('NavBar Component', () => {
  it('clicking inside the nav bar, the nav bar stays open', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<NavBar open={true}  />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Questionnaire'));
  });
});