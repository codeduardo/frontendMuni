import { fetchAxios } from '../../config/axios';
import * as actionsTypes from '../types/mesaPartesTypes';

const tramiteRequest = () => {
  return {
    type: actionsTypes.TRAMITE_REQUEST,
  };
};

const tramiteSuccess = (msg) => {
  return {
    type: actionsTypes.TRAMITE_SUCCESS,
    payload: msg,
  };
};

export const tramiteFailure = (msg) => {
  return {
    type: actionsTypes.TRAMITE_FAILURE,
    payload: msg,
  };
};

const tramitesListado = (tramites) => {
  return {
    type: actionsTypes.TRAMITES_LISTADO,
    payload: tramites,
  };
};

export const limpiarMsg = () => {
  return {
    type: actionsTypes.LIMPIAR_MSG,
  };
};

export const newTramite = (tramite) => async (dispatch) => {
  dispatch(tramiteRequest());
  try {
    await fetchAxios.post('/tramites', tramite);
    dispatch(tramiteSuccess('Trámite enviado correctamente'));
    setTimeout(() => {
      dispatch(limpiarMsg());
      window.location.reload();
    }, 3000);
  } catch (error) {
    dispatch(tramiteFailure('Error al enviar tu trámite'));
    setTimeout(() => {
      dispatch(limpiarMsg());
    }, 3000);
  }
};

export const listTramites = (setDataTramites) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(tramiteRequest());
  try {
    const res = await fetchAxios.get('/tramites', {
      headers: {
        'x-token': token,
      },
    });
    dispatch(tramiteSuccess('Trámite listado correctamente'));
    dispatch(tramitesListado(res.data.tramites));
    setDataTramites(res.data.tramites);
  } catch (error) {
    dispatch(tramiteFailure('Error al obtener los trámites'));
  }
  setTimeout(() => {
    dispatch(limpiarMsg());
  }, 3000);
};
