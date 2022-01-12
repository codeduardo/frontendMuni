import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import React from 'react';
import { deleteDocumento } from '../../../redux/actions/documentosActions';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalDelete = (idDocumento) => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(SweetAlert);
  const onDelete = () => {
    console.log(idDocumento.idDocumento);
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
        dispatch(deleteDocumento(idDocumento.idDocumento));
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
