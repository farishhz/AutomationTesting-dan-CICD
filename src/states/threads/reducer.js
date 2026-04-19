import { createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
    toggleUpvoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id === threadId) {
          const isUpvoted = thread.upVotesBy.includes(userId);
          return {
            ...thread,
            upVotesBy: isUpvoted
              ? thread.upVotesBy.filter((id) => id !== userId)
              : [...thread.upVotesBy, userId],
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    },
    toggleDownvoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id === threadId) {
          const isDownvoted = thread.downVotesBy.includes(userId);
          return {
            ...thread,
            downVotesBy: isDownvoted
              ? thread.downVotesBy.filter((id) => id !== userId)
              : [...thread.downVotesBy, userId],
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    },
  },
});

export const {
  receiveThreads, addThread, toggleUpvoteThread, toggleDownvoteThread,
} = threadsSlice.actions;

export const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await API.createThread({ title, body, category });
    dispatch(addThread(thread));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpvoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('You must login first');
    return;
  }
  dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
  try {
    const { threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    if (thread.upVotesBy.includes(authUser.id)) {
      await API.toggleUpVoteThread(threadId);
    } else {
      await API.toggleNeutralVoteThread(threadId);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
  }
};

export const asyncToggleDownvoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('You must login first');
    return;
  }
  dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
  try {
    const { threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    if (thread.downVotesBy.includes(authUser.id)) {
      await API.toggleDownVoteThread(threadId);
    } else {
      await API.toggleNeutralVoteThread(threadId);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
  }
};

export default threadsSlice.reducer;
