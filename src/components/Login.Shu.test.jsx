import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GoogleLogin from './GoogleLogin';
import * as firebaseUtilities from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

jest.mock('../utilities/firebase', () => ({
  signInWithGoogle: jest.fn(),
  useAuthState: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('<GoogleLogin />', () => {
  it('recognizes the user as authenticated after logging in', async () => {
    firebaseUtilities.signInWithGoogle.mockResolvedValue({ user: {} });
    firebaseUtilities.useAuthState.mockReturnValue([true, false]);
    const mockNavigate = useNavigate();

    const { getByTestId } = render(<GoogleLogin />);

    fireEvent.click(getByTestId('login-button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/questionnaire');
    });
  });
});
