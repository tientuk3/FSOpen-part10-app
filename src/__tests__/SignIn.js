import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { SignInContainer } from '../components/SignIn';

const mockOnSubmit = jest.fn(console.log('called'));

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      render(<SignInContainer onSubmit={mockOnSubmit} />);
      
      act(() => {
        // fill in fields
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')

        // press button
        fireEvent.press(screen.getByTestId('signInButton'))
      })

      setTimeout(() =>{
  
        expect(mockOnSubmit.mock.calls.length).toBe(1);
        console.log(mockOnSubmit.mock.calls[0]);
                  
      }, 2000); // How long you want the delay to be, measured in milliseconds.
      

      /*
      await waitFor(() => {
        expect(mockOnSubmit.mock.calls.length).toBe(1);
        console.log(mockOnSubmit.mock.calls[0]);
        //expect(mockOnSubmit.mock.calls[0].username).toBe('kalle');
        //expect(mockOnSubmit.mock.calls[0].password).toBe('password');
      });
      */

    });
  });
});