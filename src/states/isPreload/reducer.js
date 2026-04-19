import { createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';
import { setAuthUser } from '../authUser/reducer';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload: (state, action) => action.payload,
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const authUser = await API.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch {
    dispatch(setAuthUser(null));
  } finally {
    dispatch(setIsPreload(false));
    dispatch(hideLoading());
  }
};

export default isPreloadSlice.reducer;
