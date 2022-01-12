import { Button, Form, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTurismo } from '../../../redux/actions/turismoActions';
import Descripcion from './Descripcion';

const ModalCreate = () => {
  const [visible, setVisible] = useState(false);
  const [sendFile, setSendFile] = useState('');
  const [descripcion, setDescripcion] = useState('');
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

  const desc = (info) => {
    setDescripcion(info);
  };

  const onOk = () => {
    if (!sendFile || !descripcion) {
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
          description: descripcion,
        };
        dispatch(createTurismo(data, sendFile));
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
    setDescripcion('');
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
        Agregar Sitio Turístico
      </Button>

      <Modal
        title="Agregar un sitio turístico"
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
            name="name"
            labelAlign="left"
            label="Nombre"
            labelCol={{ span: 6 }}
            htmlFor="name"
            rules={[
              {
                required: true,
                message: 'Ingrese el nombre del sitio turístico!',
              },
            ]}
          >
            <Input id="name" />
          </Form.Item>
          <label>Descripcion</label>
          {!descripcion ? (
            <Descripcion desc={desc} />
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

export default ModalCreate;
