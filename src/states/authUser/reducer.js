import { createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => action.payload,
    unsetAuthUser: () => null,
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = await API.login({ email, password });
    API.putAccessToken(token);
    const authUser = await API.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(unsetAuthUser());
  API.putAccessToken('');
};

export default authUserSlice.reducer;
