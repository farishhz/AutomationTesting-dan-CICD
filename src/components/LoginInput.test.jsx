import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

/**
 * LoginInput component test scenario
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('name@example.com');

    // action
    await userEvent.type(emailInput, 'test@example.com');

    // assert
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('••••••••');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput.value).toBe('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('name@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    // action
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'passwordtest',
    });
  });
});
