import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Upload, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { columns } from './back/Column';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './redAdministrativa.scss';
import {
  getRa,
  createMiembro,
} from '../../redux/actions/redAdministrativaActions';

const RedAdministrativa = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const dataRa = useSelector((s) => s.RedAdministrativa.redAdministrativa);
  console.log(dataRa);
  const [sendFile, setSendFile] = useState('');
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

  const handleFinish = () => {
    if (!sendFile) {
      MySwal.fire({
        title: 'Error',
        text: 'imagen son obligatorios',
        icon: 'error',
      });
      return;
    }
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
        };
        dispatch(createMiembro(data, sendFile));
        MySwal.fire({
          title: 'Miembro Creado',
          text: 'El miembro se ha creado correctamente',
          icon: 'success',
        }).then(() => {
          form.resetFields();
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    dispatch(getRa());
  }, [dispatch]);
  return (
    <div className="redAdministrativa">
      <h2 className="title">Red Administrativa</h2>
      <div className="content">
        <div className="content-left">
          <Table
            dataSource={dataRa}
            columns={columns}
            pagination={{
              pageSize: 8,
            }}
          />
          ;
        </div>
        <div className="content-right">
          <h3
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
          >
            Agregar Miembro
          </h3>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              name="fullName"
              label="Nombre Completo"
              rules={[
                { required: true },
                { message: 'Se requiere el nombre completo' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="rol"
              label="Rol"
              rules={[{ required: true }, { message: 'Se requiere rol ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="profesion"
              label="Profesion"
              rules={[{ required: true }, { message: 'Ingrese profesion ' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Correo"
              rules={[{ required: true }, { message: 'Ingrese un correo' }]}
            >
              <Input />
            </Form.Item>
            <Upload accept="image/*" onChange={fileChange}>
              <Button icon={<UploadOutlined />}>Suba una Imagen</Button>
            </Upload>
            <Button htmlType="submit" type="primary">
              Agregar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RedAdministrativa;
