import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';
import { asyncAddThread, addThread } from './reducer';

/**
 * Thunk Test Scenario
 *
 * - asyncAddThread thunk
 *  - should dispatch actions correctly when data fetching success
 *  - should dispatch actions and call alert correctly when data fetching failed
 */

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    API._createThread = API.createThread;
  });

  afterEach(() => {
    API.createThread = API._createThread;

    // delete backup
    delete API._createThread;
  });

  it('should dispatch actions correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    API.createThread = vi.fn().mockResolvedValue(fakeThreadResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncAddThread({
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThread(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    API.createThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncAddThread({
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
