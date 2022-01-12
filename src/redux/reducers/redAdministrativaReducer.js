import * as actionTypes from '../types/redAdministrativaTypes';

const initialState = {
  loading: false,
  isError: false,
  msg: '',
  redAdministrativa: [],
};

export const redAdministrativaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.RA_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case actionTypes.RA_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        msg: action.payload,
      };
    case actionTypes.LIMPIAR_MSG:
      return {
        ...state,
        loading: false,
        msg: '',
      };
    case actionTypes.RA_LISTADO:
      return {
        ...state,
        loading: false,
        redAdministrativa: action.payload,
      };
    default:
      return state;
  }
};
