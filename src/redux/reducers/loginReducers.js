import * as actionsTypes from '../types/loginTypes';

const initialState = {
  isAuthenticated: localStorage.getItem('Auth') || false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  msg: '',
  token: localStorage.getItem('token') || '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('Auth', true);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case actionsTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        msg: action.payload,
        token: null,
        user: null,
      };
    case actionsTypes.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        msg: '',
      };
    case actionsTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
