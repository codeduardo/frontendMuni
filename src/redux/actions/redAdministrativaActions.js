import { fetchAxios } from '../../config/axios';

import * as actionsTypes from '../types/redAdministrativaTypes';

const raRequest = () => {
  return {
    type: actionsTypes.RA_REQUEST,
  };
};

const raSuccess = (msg) => {
  return {
    type: actionsTypes.RA_SUCCESS,
    payload: msg,
  };
};

const raFailure = (msg) => {
  return {
    type: actionsTypes.RA_FAILURE,
    payload: msg,
  };
};
const limpiarMsg = () => {
  return {
    type: actionsTypes.LIMPIAR_MSG,
  };
};

const raListado = (listRa) => {
  return {
    type: actionsTypes.RA_LISTADO,
    payload: listRa,
  };
};

export const createMiembro = (miembro, file) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await fetchAxios.post('/colaborador', miembro, {
      headers: {
        'x-token': token,
      },
    });
    console.log(data);
    await fetchAxios.put(
      `/uploads/imagen/colaborador/${data.colaborador._id}`,
      file,
      {
        headers: {
          'x-token': token,
          contentType: 'multipart/form-data',
        },
      }
    );
    dispatch(raSuccess('Evento creado correctamente'));
    window.location.reload();
  } catch (error) {
    console.log(error.response);
    dispatch(raFailure('Error al crear el evento'));
  }
};

export const getRa = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(raRequest());
  try {
    const res = await fetchAxios.get('/colaborador');
    // setDataRa(res.data.colaboradores);
    dispatch(raListado(res.data.colaboradores));
    dispatch(
      raSuccess('Red administrativa listada ', {
        headers: {
          'x-token': token,
        },
      })
    );
  } catch (e) {
    dispatch(raFailure('red administrativa no obtenida'));
  }
  setTimeout(() => {
    dispatch(limpiarMsg());
  }, 3000);
};

export const deleteMiembro = (idColaborador) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(raRequest());
  try {
    await fetchAxios.delete(`/colaborador/${idColaborador}`, {
      headers: {
        'x-token': token,
      },
    });
    dispatch(raSuccess('colaborador eliminado'));
    window.location.reload();
  } catch (e) {
    dispatch(raFailure('no se puede eliminar al colaborador'));
  }

  setTimeout(() => {
    dispatch(limpiarMsg());
  }, 3000);
};
