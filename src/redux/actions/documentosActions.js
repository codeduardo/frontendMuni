import { fetchAxios } from '../../config/axios';
import * as actionsTypes from '../types/documentos';

export const documentoRequest = () => {
  return {
    type: actionsTypes.DOCUMENTO_REQUEST,
  };
};

export const documentoSuccess = (msg) => {
  return {
    type: actionsTypes.DOCUMENTO_SUCCESS,
    payload: msg,
  };
};

export const documentoFailure = (msg) => {
  return {
    type: actionsTypes.DOCUMENTO_FAILURE,
    payload: msg,
  };
};

export const limpiarMsg = () => {
  return {
    type: actionsTypes.LIMPIAR_MSG,
  };
};

export const documentoListado = (documentos) => {
  return {
    type: actionsTypes.DOCUMENTO_LISTADO,
    payload: documentos,
  };
};

export const newDocumento = (documento) => async (dispatch) => {
  dispatch(documentoRequest);
  const token = localStorage.getItem('token');
  try {
    await fetchAxios.post('/documentos', documento, {
      headers: {
        'x-token': token,
      },
    });
    dispatch(documentoSuccess('Documento Creado'));
    window.location.reload();
  } catch (err) {
    dispatch(documentoFailure('error al listar documentos'));
    setTimeout(() => {
      dispatch(limpiarMsg);
    }, 3000);
    console.log(err.response);
  }
};

export const listDocumentos = (SetDataDocumentos) => async (dispatch) => {
  dispatch(documentoRequest);
  const token = localStorage.getItem('token');
  try {
    const res = await fetchAxios.get('/documentos', {
      headers: {
        'x-token': token,
      },
    });
    dispatch(documentoSuccess('se listo docuemntos correctamente '));
    dispatch(documentoListado(res.data.documentos));
    SetDataDocumentos(res.data.documentos);
  } catch (err) {
    dispatch(documentoFailure('error al listar documentos'));
  } finally {
    setTimeout(() => {
      dispatch(limpiarMsg);
    }, 3000);
  }
};
export const deleteDocumento = (idDocumento) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await fetchAxios.delete(`/documentos/${idDocumento}`, {
      headers: {
        'x-token': token,
      },
    });
    dispatch(documentoSuccess('documento eliminado correctamente '));
    window.location.reload();
  } catch (err) {
    dispatch(documentoFailure('error al eliminar documento'));
  }
};
