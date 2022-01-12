import { Button, DatePicker, Form, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../../redux/actions/eventosActions';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import Descripcion from './Descripcion';

const ModalCreate = () => {
  const [visible, setVisible] = useState(false);
  const [sendFile, setSendFile] = useState('');
  const [description, setDescription] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const MySwal = withReactContent(SweetAlert);

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

  const OnVisibleModal = () => {
    setVisible(true);
  };

  const onOk = () => {
    if (!sendFile || !description) {
      MySwal.fire({
        title: 'Error',
        text: 'Descripcion (pulsar hecho) e imagen son obligatorios',
        icon: 'error',
      });
      return;
    }
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          description,
          fecha_evento: moment(values.fecha_evento).format('YYYY-MM-DD'),
        };
        dispatch(createEvent(data, sendFile));
        MySwal.fire({
          title: 'Evento Creado',
          text: 'El evento se ha creado correctamente',
          icon: 'success',
        }).then(() => {
          form.resetFields();
          setVisible(false);
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCancel = () => {
    setVisible(!visible);
    form.resetFields();
    setSendFile('');
  };

  const desc = (info) => {
    setDescription(info);
  };

  return (
    <>
      <Button
        onClick={OnVisibleModal}
        type="dashed"
        size="large"
        shape="default"
        style={{ marginBottom: '20px', marginLeft: '10px' }}
      >
        Agregar Evento
      </Button>

      <Modal
        title="Agregar Evento"
        visible={visible}
        centered
        okText="Agregar"
        cancelText="Cancelar"
        onCancel={onCancel}
        width={900}
        onOk={onOk}
      >
        <Form form={form}>
          <Form.Item
            name="title"
            labelAlign="left"
            label="Titulo"
            labelCol={{ span: 6 }}
            htmlFor="titulo"
            rules={[
              { required: true, message: 'Ingrese el titulo del evento!' },
            ]}
          >
            <Input id="titulo" />
          </Form.Item>
          <label>Descripcion</label>
          {!description ? (
            <Descripcion desc={desc} />
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
            style={{ marginTop: '50px' }}
            labelCol={{ span: 6 }}
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

export default ModalCreate;
