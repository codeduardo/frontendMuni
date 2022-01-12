import { useState } from 'react';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  actualizarTurismo,
  obtenerTurismo,
} from '../../../redux/actions/turismoActions';
import Descripcion from './Descripcion';

const ModalEditTurismo = ({ idTurismo }) => {
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [sendFile, setSendFile] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const MySwal = withReactContent(SweetAlert);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const clickHandler = () => {
    console.log(idTurismo);
    dispatch(obtenerTurismo(idTurismo, setEditForm, setVisible));
  };

  const fileChange = (info) => {
    let file;
    if (info.fileList.length === 1) {
      file = info.file.originFileObj;
      const data = new FormData();
      data.append('archivo', file);
      setSendFile(data);
      return;
    }
    if (info.fileList.length > 1) {
      const datas = new FormData();
      info.fileList.forEach((f) => {
        datas.append('archivo', f.originFileObj);
      });
      setSendFile(datas);
      return;
    }
    setSendFile('');
  };

  const onOk = () => {
    if (!descripcion) {
      MySwal.fire({
        title: 'Error',
        text: 'Debe ingresar una descripcion o pulsar el botón de Hecho',
        icon: 'error',
      });
      return;
    }
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          description: descripcion,
        };
        dispatch(actualizarTurismo(idTurismo, data, sendFile));
        MySwal.fire({
          title: 'Evento Actualizado Correctamente',
          icon: 'success',
          showConfirmButton: false,
        }).then(() => {
          setVisible(false);
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const onCancel = () => {
    setEditForm(null);
    setVisible(!visible);
    setDescripcion('');
  };
  const desc = (info) => {
    setDescripcion(info);
  };

  return (
    <>
      <EditOutlined onClick={clickHandler} />
      <Modal
        title="Editar Evento"
        visible={visible}
        centered
        onOk={onOk}
        width={900}
        onCancel={onCancel}
      >
        <Form
          id="formEdit"
          name="ModalEdit"
          form={form}
          initialValues={editForm}
        >
          <Form.Item
            label="Nombre"
            labelAlign="left"
            labelCol={{ span: 6 }}
            name="name"
            htmlFor="name"
            rules={[
              { required: true, message: 'Ingrese el titulo del evento!' },
            ]}
          >
            <Input id="name" />
          </Form.Item>
          <label> Descripcion: </label>
          {!descripcion ? (
            <Descripcion desc={desc} valueInitial={editForm} />
          ) : (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: descripcion }}
            />
          )}
          <Form.Item
            name="ubicacion"
            labelAlign="left"
            label="Ubicación"
            labelCol={{ span: 6 }}
            htmlFor="ubicacion"
            style={{ marginTop: '50px' }}
          >
            <Input id="ubicacion" />
          </Form.Item>

          <Upload onChange={fileChange} multiple={true} accept="image/*">
            <Button icon={<UploadOutlined />}>Suba una Imagen</Button>
          </Upload>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditTurismo;
