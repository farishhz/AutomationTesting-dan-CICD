import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    receiveUsers: (state, action) => action.payload,
  },
});

export const { receiveUsers } = usersSlice.actions;

export const asyncRegisterUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await API.register({ name, email, password });
  } catch (error) {
    alert(error.message);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export default usersSlice.reducer;
