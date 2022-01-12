import React from 'react';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteMiembro } from '../../../redux/actions/redAdministrativaActions';

const ModalDelete = (idColaborador) => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(SweetAlert);
  const onDelete = () => {
    console.log(idColaborador.idColaborador);
    MySwal.fire({
      title: '¿Estás seguro de eliminar el documento?',
      text: 'Una vez eliminado no podrás recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        dispatch(deleteMiembro(idColaborador.idColaborador));
        MySwal.fire({
          title: 'Eliminado!',
          text: 'El documento ha sido eliminado correctamente.',
          icon: 'success',
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={() => onDelete()}
        type="primary"
        size="medium"
        shape="circle"
        icon={<DeleteOutlined />}
      />
    </div>
  );
};

export default ModalDelete;
