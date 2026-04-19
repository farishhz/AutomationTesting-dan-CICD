import { createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    toggleUpvoteDetail: (state, action) => {
      const { userId } = action.payload;
      const isUpvoted = state.upVotesBy.includes(userId);
      state.upVotesBy = isUpvoted
        ? state.upVotesBy.filter((id) => id !== userId)
        : [...state.upVotesBy, userId];
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
    },
    toggleDownvoteDetail: (state, action) => {
      const { userId } = action.payload;
      const isDownvoted = state.downVotesBy.includes(userId);
      state.downVotesBy = isDownvoted
        ? state.downVotesBy.filter((id) => id !== userId)
        : [...state.downVotesBy, userId];
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
    },
    addComment: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    toggleUpvoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      state.comments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          const isUpvoted = comment.upVotesBy.includes(userId);
          return {
            ...comment,
            upVotesBy: isUpvoted
              ? comment.upVotesBy.filter((id) => id !== userId)
              : [...comment.upVotesBy, userId],
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      });
    },
    toggleDownvoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      state.comments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          const isDownvoted = comment.downVotesBy.includes(userId);
          return {
            ...comment,
            downVotesBy: isDownvoted
              ? comment.downVotesBy.filter((id) => id !== userId)
              : [...comment.downVotesBy, userId],
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      });
    },
  },
});

export const {
  receiveThreadDetail, clearThreadDetail, toggleUpvoteDetail,
  toggleDownvoteDetail, addComment, toggleUpvoteComment, toggleDownvoteComment,
} = threadDetailSlice.actions;

export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetail());
  try {
    const threadDetail = await API.getThreadDetail(threadId);
    dispatch(receiveThreadDetail(threadDetail));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpvoteDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('You must login first');
    return;
  }
  dispatch(toggleUpvoteDetail({ userId: authUser.id }));
  try {
    if (threadDetail.upVotesBy.includes(authUser.id)) {
      await API.toggleNeutralVoteThread(threadDetail.id);
    } else {
      await API.toggleUpVoteThread(threadDetail.id);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpvoteDetail({ userId: authUser.id }));
  }
};

export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const comment = await API.createComment({ threadId, content });
    dispatch(addComment(comment));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpvoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('You must login first');
    return;
  }
  dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));
  try {
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    if (comment.upVotesBy.includes(authUser.id)) {
      await API.toggleNeutralVoteComment({ threadId: threadDetail.id, commentId });
    } else {
      await API.toggleUpVoteComment({ threadId: threadDetail.id, commentId });
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));
  }
};

export const asyncToggleDownvoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('You must login first');
    return;
  }
  dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));
  try {
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    if (comment.downVotesBy.includes(authUser.id)) {
      await API.toggleNeutralVoteComment({ threadId: threadDetail.id, commentId });
    } else {
      await API.toggleDownVoteComment({ threadId: threadDetail.id, commentId });
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));
  }
};

export default threadDetailSlice.reducer;
