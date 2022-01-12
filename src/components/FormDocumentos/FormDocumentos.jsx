import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../docfb';
import {
  documentoFailure,
  limpiarMsg,
  newDocumento,
} from '../../redux/actions/documentosActions';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './formDocumentos.scss';

const { Option } = Select;
const storage = getStorage(firebaseApp);

const FormDocumentos = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const MySwal = withReactContent(SweetAlert);
  const tipoDocumentoState = useSelector(
    (state) => state.TipoDocumento.documentos
  );
  const fileHandler = async (e) => {
    // detectar el archivo
    const archivoLocal = e.target.files[0];
    const type = archivoLocal.type.split('/');
    if (type[1] !== 'pdf') {
      dispatch(documentoFailure('El archivo debe ser un PDF'));
      setTimeout(() => {
        dispatch(limpiarMsg());
      }, 5000);
      return;
    }
    try {
      setLoading(true);
      //cargarlo a firebase storage
      const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
      await uploadBytes(archivoRef, archivoLocal);
      //obtener url de descarga
      const urlDescarga = await getDownloadURL(archivoRef);
      setFileName(archivoLocal.name);
      setFile(urlDescarga);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      MySwal.fire({
        title: 'Error',
        text: 'Debe seleccionar almenos una imagen',
        icon: 'error',
      });
      dispatch(documentoFailure('Seleccione un archivo'));
      setTimeout(() => {
        dispatch(limpiarMsg());
      }, 5000);

      return;
    }

    form
      .validateFields()
      .then((data) => {
        const values = {
          ...data,
          file,
        };
        dispatch(newDocumento(values));
        MySwal.fire({
          title: 'Documento Creado',
          text: 'El documento se ha creado correctamente',
          icon: 'success',
          showConfirmButton: false,
        }).then(() => {
          form.resetFields();
          setFile('');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form
        form={form}
        name="control-hooks"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Nombre de Documento"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tipo"
          label="Tipo de documento"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Select placeholder="--Seleccionar--" allowClear>
            {tipoDocumentoState
              ? tipoDocumentoState.map((doc) => (
                  <Option key={doc.name} value={doc.name}>
                    {doc.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item
          name="year"
          label="Año"
          rules={[{ required: true, message: 'Campo requerido' }]}
        >
          <Input />
        </Form.Item>

        <div className="campo doc">
          <label>
            <span>*</span> Documento
          </label>
          <div className="input">
            {fileName ? (
              <label htmlFor="file">{fileName}</label>
            ) : (
              <label htmlFor="file">
                Subir Archivo <i className="fas fa-file-upload"></i>
              </label>
            )}
            <input
              type="file"
              hidden
              id="file"
              name="doc"
              accept="application/pdf"
              onChange={fileHandler}
            />
            {loading && (
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
            )}
          </div>
        </div>

        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default FormDocumentos;
