import * as actionsTypes from '../types/documentos';

const initialState = {
  loading: false,
  isError: false,
  documentos: [],
  msg: '',
};

export const documentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.DOCUMENTO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.DOCUMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case actionsTypes.DOCUMENTO_FAILURE:
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
    case actionsTypes.DOCUMENTO_LISTADO:
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payloaad,
        documentos: action.payload,
      };
    default:
      return state;
  }
};
