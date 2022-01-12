import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import {
  listTipoDocumentos,
  newTipoDocumento,
} from '../../../redux/actions/tiposDocumentosActions';

const ModalAdd = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const OnVisibleModal = () => {
    setVisible(!visible);
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        dispatch(newTipoDocumento(values));
        dispatch(listTipoDocumentos());
        setVisible(!visible);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  return (
    <>
      <Button
        onClick={OnVisibleModal}
        type="dashed"
        size="large"
        shape="default"
        className="agregar"
      >
        Agregar
      </Button>
      <Modal
        title="Agregar Tipo de Documento"
        visible={visible}
        centered
        okText="Agregar"
        cancelText="Cancelar"
        onCancel={() => setVisible(!visible)}
        width={600}
        onOk={onOk}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            labelAlign="left"
            label="Nombre"
            labelCol={{ span: 5 }}
            htmlFor="name"
            rules={[
              { required: true, message: 'Ingrese nombre de documento !' },
            ]}
          >
            <Input id="name" />
          </Form.Item>
          <Form.Item
            name="description"
            labelAlign="left"
            label="Descripción"
            labelCol={{ span: 5 }}
            htmlFor="description"
            rules={[
              { required: true, message: 'Ingrese descripcion del evento' },
            ]}
          >
            <Input.TextArea id="description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdd;
