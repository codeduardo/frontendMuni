import * as actionsTypes from '../types/mesaPartesTypes';

const INITIAL_STATE = {
  loading: false,
  tramites: [],
  isError: false,
  msg: '',
};

export const mesaPartesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TRAMITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.TRAMITE_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payload,
      };
    case actionsTypes.TRAMITE_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        msg: action.payload,
      };
    case actionsTypes.LIMPIAR_MSG:
      return {
        ...state,
        msg: '',
      };
    case actionsTypes.TRAMITES_LISTADO:
      return {
        ...state,
        loading: false,
        isError: false,
        tramites: action.payload,
      };
    default: {
      return state;
    }
  }
};
