import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import API from '../../utils/api';
import { receiveThreads } from '../threads/reducer';
import { receiveUsers } from '../users/reducer';

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const users = await API.getAllUsers();
    const threads = await API.getAllThreads();

    dispatch(receiveUsers(users));
    dispatch(receiveThreads(threads));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
