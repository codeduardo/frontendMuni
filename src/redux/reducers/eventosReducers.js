import * as actionsTypes from '../types/eventosTypes';

const INITIAL_STATE = {
  loading: false,
  isError: false,
  msg: '',
  eventos: [],
  evento: null,
};

export const eventosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.EVENTO_REQUEST:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case actionsTypes.NEW_EVENTO_SUCCESS:
    case actionsTypes.ACTUALIZAR_EVENTO_SUCCESS:
    case actionsTypes.ELIMINAR_EVENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payload,
      };
    case actionsTypes.EVENTO_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        msg: action.payload,
      };
    case actionsTypes.LISTAR_EVENTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        eventos: action.payload,
      };
    case actionsTypes.OBTENER_EVENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        evento: action.payload,
      };
    default:
      return state;
  }
};
