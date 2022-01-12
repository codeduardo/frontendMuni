import moment from 'moment';
import { fetchAxios } from '../../config/axios';
import * as actionsTypes from '../types/eventosTypes';

const eventosRequest = () => {
  return {
    type: actionsTypes.EVENTO_REQUEST,
  };
};

const eventosSuccess = (msg) => {
  return {
    type: actionsTypes.NEW_EVENTO_SUCCESS,
    payload: msg,
  };
};

const listarEventosSuccess = (eventos) => {
  return {
    type: actionsTypes.LISTAR_EVENTOS_SUCCESS,
    payload: eventos,
  };
};

const obtenerEventoSuccess = (evento) => {
  return {
    type: actionsTypes.OBTENER_EVENTO_SUCCESS,
    payload: evento,
  };
};

const actualizarEventoSuccess = (msg) => {
  return {
    type: actionsTypes.ACTUALIZAR_EVENTO_SUCCESS,
    payload: msg,
  };
};

const eliminarEventoSuccess = (msg) => {
  return {
    type: actionsTypes.ELIMINAR_EVENTO_SUCCESS,
    payload: msg,
  };
};

export const eventosFailure = (msg) => {
  return {
    type: actionsTypes.EVENTO_FAILURE,
    payload: msg,
  };
};

export const createEvent = (evento, file) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await fetchAxios.post('/eventos', evento, {
      headers: {
        'x-token': token,
      },
    });
    await fetchAxios.put(`/uploads/imagen/eventos/${data.evento._id}`, file, {
      headers: {
        'x-token': token,
        contentType: 'multipart/form-data',
      },
    });
    dispatch(eventosSuccess('Evento creado correctamente'));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(eventosFailure('Error al crear el evento'));
  }
};

export const listarEventos = () => async (dispatch) => {
  dispatch(eventosRequest());
  try {
    const { data } = await fetchAxios.get('/eventos');
    dispatch(listarEventosSuccess(data.eventos));
  } catch (error) {
    console.log(error.response);
    dispatch(eventosFailure('Error al listar los eventos'));
  }
};

export const obtenerEvento =
  (id, setEditForm, setVisible) => async (dispatch) => {
    try {
      const { data } = await fetchAxios.get(`/eventos/${id}`);
      dispatch(obtenerEventoSuccess(data.evento));
      setEditForm({
        ...data.evento,
        fecha_evento: moment(data.evento.fecha_evento),
      });
      setVisible(true);
    } catch (error) {
      console.log(error.response);
      dispatch(eventosFailure('Error al obtener el eventos'));
    }
  };

export const actualizarEvento = (id, data, file) => async (dispatch) => {
  try {
    if (file) {
      const infoEvento = fetchAxios.put(`/eventos/${id}`, data, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      });
      const imgsEvento = fetchAxios.put(`/uploads/imagen/eventos/${id}`, file, {
        headers: {
          'x-token': localStorage.getItem('token'),
          contentType: 'multipart/form-data',
        },
      });
      await Promise.all([infoEvento, imgsEvento]);
    } else {
      await fetchAxios.put(`/eventos/${id}`, data, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      });
    }
    dispatch(actualizarEventoSuccess('Evento actualizado correctamente'));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(eventosFailure('Error al actualizar el evento'));
  }
};

export const eliminarEvento = (id) => async (dispatch) => {
  try {
    await fetchAxios.delete(`/uploads/imagen/eventos/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    await fetchAxios.delete(`/eventos/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    dispatch(eliminarEventoSuccess('Evento eliminado correctamente'));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(eventosFailure('Error al eliminar el evento'));
  }
};
