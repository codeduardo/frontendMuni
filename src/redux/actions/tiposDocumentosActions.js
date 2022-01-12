import { fetchAxios } from '../../config/axios';
import * as actionsTypes from '../types/tiposdocumentos';

const documentoRequest = () => {
  return {
    type: actionsTypes.TIPO_DOCUMENTO_REQUEST,
  };
};
const documentoSuccess = (msg) => {
  return {
    type: actionsTypes.TIPO_DOCUMENTO_SUCCESS,
    payload: msg,
  };
};
const documentoFailure = (msg) => {
  return {
    type: actionsTypes.TIPO_DOCUMENTO_FAILURE,
    payload: msg,
  };
};
const documentoListado = (documentos) => {
  return {
    type: actionsTypes.TIPO_DOCUMENTOS_LISTADO,
    payload: documentos,
  };
};
const limpiarMsg = () => {
  return {
    type: actionsTypes.LIMPIAR_MSG,
  };
};

export const newTipoDocumento = (documento) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(documentoRequest());
  try {
    await fetchAxios.post('/tiposDoc', documento, {
      headers: {
        'x-token': token,
      },
    });
    dispatch(documentoSuccess('Documento creado correctamente'));
    setTimeout(() => {
      dispatch(limpiarMsg());
      window.location.reload();
    }, 3000);
  } catch (e) {
    dispatch(documentoFailure('Error al crear documento'));
    setTimeout(() => {
      dispatch(limpiarMsg());
    }, 3000);
  }
};

export const listTipoDocumentos = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(documentoRequest());
  try {
    const res = await fetchAxios.get('/tiposDoc', {
      headers: {
        'x-token': token,
      },
    });
    dispatch(documentoSuccess('DocumentoListadoCorrectamente'));
    dispatch(documentoListado(res.data.tipos));
  } catch (e) {
    dispatch(documentoFailure('Error al obtener lista de documentos'));
  }
  setTimeout(() => {
    dispatch(limpiarMsg());
  }, 3000);
};
