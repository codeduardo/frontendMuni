import { fetchAxios } from '../../config/axios';
import * as actionsTypes from '../types/loginTypes';

export const login = (user, msg) => async (dispatch) => {
  try {
    if (!user) {
      dispatch({
        type: actionsTypes.LOGIN_FAILURE,
        payload: msg,
      });
      setTimeout(() => {
        dispatch({
          type: actionsTypes.CLEAR_LOGIN_ERROR,
        });
      }, 3000);
      return;
    }
    const { data } = await fetchAxios.post('/user/login', user);
    console.log(data);

    dispatch({
      type: actionsTypes.LOGIN_SUCCESS,
      payload: data,
    });
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: actionsTypes.LOGIN_FAILURE,
      payload: error.response.data.msg,
    });
    setTimeout(() => {
      dispatch({
        type: actionsTypes.CLEAR_LOGIN_ERROR,
      });
    }, 3000);
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: actionsTypes.LOGOUT,
  });
};
