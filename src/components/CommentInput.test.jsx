import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

/**
 * CommentInput component test scenario
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call addComment function when post button is clicked
 */

describe('CommentInput component', () => {
  it('should handle content typing correctly', async () => {
    // arrange
    render(<CommentInput addComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText('What are your thoughts?');

    // action
    await userEvent.type(commentInput, 'This is a test comment');

    // assert
    expect(commentInput.value).toBe('This is a test comment');
  });

  it('should call addComment function when post button is clicked', async () => {
    // arrange
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);
    const commentInput = await screen.getByPlaceholderText('What are your thoughts?');
    const postButton = await screen.getByRole('button', { name: 'Post Comment' });

    // action
    await userEvent.type(commentInput, 'This is a test comment');
    await userEvent.click(postButton);

    // assert
    expect(mockAddComment).toHaveBeenCalledWith('This is a test comment');
  });
});
