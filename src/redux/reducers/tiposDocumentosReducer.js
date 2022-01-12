import * as actionsTypes from '../types/tiposdocumentos';

const initialState = {
  loading: false,
  tiposDocumentos: [],
  isError: false,
  msg: '',
};

export const tiposDocumentosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.TIPO_DOCUMENTO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.TIPO_DOCUMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        isError: false,
        msg: action.payload,
      };
    case actionsTypes.TIPO_DOCUMENTO_FAILURE:
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
    case actionsTypes.TIPO_DOCUMENTOS_LISTADO:
      return {
        ...state,
        loading: false,
        isError: false,
        documentos: action.payload,
      };
    default: {
      return state;
    }
  }
};
