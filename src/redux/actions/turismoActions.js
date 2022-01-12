import moment from 'moment';
import { fetchAxios } from '../../config/axios';
import * as actionsTypes from '../types/turismo';

const turismoRequest = () => {
  return {
    type: actionsTypes.TURISMO_REQUEST,
  };
};

const turismoSuccess = (msg) => {
  return {
    type: actionsTypes.NEW_TURISMO_SUCCESS,
    payload: msg,
  };
};

const listarTurismosSuccess = (turismos) => {
  return {
    type: actionsTypes.LISTAR_TURISMOS_SUCCESS,
    payload: turismos,
  };
};

const obtenerTurismoSuccess = (turismo) => {
  return {
    type: actionsTypes.OBTENER_TURISMO_SUCCESS,
    payload: turismo,
  };
};

const actualizarTurismoSuccess = (msg) => {
  return {
    type: actionsTypes.ACTUALIZAR_TURISMO_SUCCESS,
    payload: msg,
  };
};

const eliminarTurismoSuccess = (msg) => {
  return {
    type: actionsTypes.ELIMINAR_TURISMO_SUCCESS,
    payload: msg,
  };
};

export const turismosFailure = (msg) => {
  return {
    type: actionsTypes.TURISMO_FAILURE,
    payload: msg,
  };
};

export const createTurismo = (turismo, file) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await fetchAxios.post('/turismo', turismo, {
      headers: {
        'x-token': token,
      },
    });
    console.log(data);
    await fetchAxios.put(`/uploads/imagen/turismo/${data.turismo._id}`, file, {
      headers: {
        'x-token': token,
        contentType: 'multipart/form-data',
      },
    });
    dispatch(turismoSuccess('Turismo creado correctamente'));
    // window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(turismosFailure('Error al crear el Turismo'));
  }
};

export const listarTurismos = () => async (dispatch) => {
  dispatch(turismoRequest());
  try {
    const { data } = await fetchAxios.get('/turismo');
    dispatch(listarTurismosSuccess(data.sitiosTuristicos));
  } catch (error) {
    console.log(error.response);
    dispatch(turismosFailure('Error al listar los turismos'));
  }
};

export const obtenerTurismo =
  (id, setEditForm, setVisible) => async (dispatch) => {
    try {
      const { data } = await fetchAxios.get(`/turismo/${id}`);
      dispatch(obtenerTurismoSuccess(data.sitioTuristico));
      setEditForm(data.sitioTuristico);
      setVisible(true);
    } catch (error) {
      console.log(error.response);
      dispatch(turismosFailure('Error al obtener el turismos'));
    }
  };

export const actualizarTurismo = (id, data, file) => async (dispatch) => {
  try {
    if (file) {
      const infoturismo = fetchAxios.put(`/turismo/${id}`, data, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      });
      const imgsturismo = fetchAxios.put(
        `/uploads/imagen/turismo/${id}`,
        file,
        {
          headers: {
            'x-token': localStorage.getItem('token'),
            contentType: 'multipart/form-data',
          },
        }
      );
      await Promise.all([infoturismo, imgsturismo]);
    } else {
      await fetchAxios.put(`/turismo/${id}`, data, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      });
    }
    dispatch(actualizarTurismoSuccess('turismo actualizado correctamente'));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(turismosFailure('Error al actualizar el turismo'));
  }
};

export const eliminarTurismo = (id) => async (dispatch) => {
  try {
    await fetchAxios.delete(`/uploads/imagen/turismo/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    await fetchAxios.delete(`/turismo/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    dispatch(eliminarTurismoSuccess('turismo eliminado correctamente'));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(turismosFailure('Error al eliminar el turismo'));
  }
};
