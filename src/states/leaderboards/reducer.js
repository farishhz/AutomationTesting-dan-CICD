import { createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    receiveLeaderboards: (state, action) => action.payload,
  },
});

export const { receiveLeaderboards } = leaderboardsSlice.actions;

export const asyncReceiveLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const leaderboards = await API.getLeaderboards();
    dispatch(receiveLeaderboards(leaderboards));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default leaderboardsSlice.reducer;
