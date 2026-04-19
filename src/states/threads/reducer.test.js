import { describe, it, expect } from 'vitest';
import threadsReducer, { receiveThreads, addThread, toggleUpvoteThread } from './reducer';

/**
 * Threads Reducer Test Scenario
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by receiveThreads action
 *  - should return the threads with the new thread when given by addThread action
 *  - should return the threads with the toggled upvote thread when given by toggleUpvoteThread action
 */

describe('threadsReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by receiveThreads action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: receiveThreads.type,
      payload: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });

  it('should return the threads with the new thread when given by addThread action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: addThread.type,
      payload: {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload, ...initialState]);
  });

  it('should return the threads with the toggled upvote thread when given by toggleUpvoteThread action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: toggleUpvoteThread.type,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toContain(action.payload.userId);

    // action: cancel upvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2[0].upVotesBy).not.toContain(action.payload.userId);
  });
});
