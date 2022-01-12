import * as actionsTypes from '../types/turismo';

const INITIAL_STATE = {
  loading: false,
  isError: false,
  msg: '',
  turismos: [],
  turismo: null,
};

export const turismoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TURISMO_REQUEST:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case actionsTypes.NEW_TURISMO_SUCCESS:
    case actionsTypes.ACTUALIZAR_TURISMO_SUCCESS:
    case actionsTypes.ELIMINAR_TURISMO_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payload,
      };
    case actionsTypes.TURISMO_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        msg: action.payload,
      };
    case actionsTypes.LISTAR_TURISMOS_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        turismos: action.payload,
      };
    case actionsTypes.OBTENER_TURISMO_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        turismo: action.payload,
      };
    default:
      return state;
  }
};
