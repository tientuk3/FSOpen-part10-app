import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';
const mockOnSubmit = jest.fn();

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      render(<SignInContainer onSubmit={mockOnSubmit} />);

      // screen.debug.shallow();

      await waitFor(() => { fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle') })

      await waitFor(() => { fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password') })

      // press button
      await waitFor(() => { fireEvent.press(screen.getByTestId('signInButton')) })
      
      await waitFor(() => {
        expect(mockOnSubmit.mock.calls.length).toBe(1);
        expect(mockOnSubmit.mock.calls[0][0].username).toBe('kalle');
        expect(mockOnSubmit.mock.calls[0][0].password).toBe('password');
      });

    });
  });
});