import React, { useState } from 'react';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import {
  actualizarEvento,
  obtenerEvento,
} from '../../../redux/actions/eventosActions';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import Descripcion from './Descripcion';

const ModalEditEvento = ({ idEvento }) => {
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [sendFile, setSendFile] = useState('');
  const [description, setDescription] = useState('');
  const MySwal = withReactContent(SweetAlert);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(obtenerEvento(idEvento, setEditForm, setVisible));
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
    if (!description) {
      MySwal.fire({
        title: 'Error',
        text: 'Debe ingresar la descripción o pulsar el botón de Hecho',
        icon: 'error',
      });
      return;
    }
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          fecha_evento: moment(values.fecha_evento).format('YYYY-MM-DD'),
          description,
        };
        dispatch(actualizarEvento(idEvento, data, sendFile));
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
    setDescription('');
  };

  const desc = (info) => {
    setDescription(info);
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
            label="Titulo"
            labelAlign="left"
            labelCol={{ span: 6 }}
            name="title"
            htmlFor="title"
            rules={[
              { required: true, message: 'Ingrese el titulo del evento!' },
            ]}
          >
            <Input id="title" />
          </Form.Item>
          <label>Descripcion</label>
          {!description ? (
            <Descripcion desc={desc} valueInitial={editForm} />
          ) : (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <Form.Item
            labelAlign="left"
            name="fecha_evento"
            label="Fecha del Evento"
            labelCol={{ span: 6 }}
            style={{ marginTop: '50px' }}
            rules={[{ required: true, message: 'Ingrese fecha del evento' }]}
          >
            <DatePicker placeholder={'Ingrese Fecha'} format="DD/MM/YYYY" />
          </Form.Item>
          <Upload onChange={fileChange} multiple={true} accept="image/*">
            <Button icon={<UploadOutlined />}>Suba una Imagen</Button>
          </Upload>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditEvento;
