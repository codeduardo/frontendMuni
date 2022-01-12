import './formMesaParte.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import firebaseApp from '../../docfb';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  limpiarMsg,
  newTramite,
  tramiteFailure,
} from '../../redux/actions/mesaPartesActions';

const storage = getStorage(firebaseApp);

const FormMesaPartes = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const mesaSchemas = yup.object().shape({
    tipoDoc: yup.string().required('Seleccione un tipo de documento'),
    nro_documento: yup
      .number()
      .positive('Ingrese un número de documento válido')
      .integer('Ingrese un número de documento válido')
      .typeError('El documento debe ser válido')
      .required('Ingrese el número de documento'),
    nombres: yup
      .string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('Ingrese el nombre'),
    ap_paterno: yup
      .string()
      .min(3, 'El apellido paterno es muy corto')
      .max(15, 'El apellido paterno es muy largo')
      .required('Ingrese el apellido paterno'),
    ap_materno: yup
      .string()
      .min(3, 'El apellido materno es muy corto')
      .max(15, 'El apellido materno es muy largo')
      .required('Ingrese el apellido materno'),
    email: yup.string().email('Ingrese un correo válido'),
    telefono: yup
      .number()
      .positive('Ingrese un número de teléfono válido')
      .integer('Ingrese un número de teléfono válido')
      .typeError('El teléfono debe ser un número')
      .required('Ingrese el teléfono'),
    direccion: yup.string().required('Ingrese la dirección'),
    tramite: yup.string().required('Seleccione el trámite a realizar'),
  });
  const fileHandler = async (e) => {
    // detectar el archivo
    const archivoLocal = e.target.files[0];
    const type = archivoLocal.type.split('/');
    if (type[1] !== 'pdf') {
      dispatch(tramiteFailure('El archivo debe ser un PDF'));
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

  const handleSubmit = (values) => {
    if (!file) {
      dispatch(tramiteFailure('Seleccione un archivo'));
      setTimeout(() => {
        dispatch(limpiarMsg());
      }, 5000);
      return;
    }
    const data = {
      ...values,
      file,
    };
    dispatch(newTramite(data));
  };

  return (
    <Formik
      initialValues={{
        tipoDoc: '',
        nro_documento: '',
        nombres: '',
        ap_paterno: '',
        ap_materno: '',
        email: '',
        telefono: '',
        direccion: '',
        tramite: '',
        comentario: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={mesaSchemas}
    >
      {({ errors, touched }) => {
        return (
          <Form className="form-mp">
            <h2>Datos del Solicitante</h2>
            <div className="tipo-dni  ">
              <div className="campo tp_doc">
                <label htmlFor="tipoDoc">
                  Tipo de documento de Identidad <span>*</span>
                </label>
                <Field
                  component="select"
                  id="tipo_Doc"
                  name="tipoDoc"
                  className="tp_doc--input"
                >
                  <option disabled value="">
                    --Seleccione--
                  </option>
                  <option value="dni">DNI</option>
                  <option value="ext">EXT</option>
                </Field>
                {errors.tipoDoc && touched.tipoDoc ? (
                  <div className="error--alerta">
                    <i>{errors.tipoDoc}</i>
                  </div>
                ) : null}
              </div>
              <div className="campo nro_doc">
                <label htmlFor="nro_doc">
                  N° de documento <span>*</span>
                </label>
                <Field
                  type="number"
                  id="nro_doc"
                  name="nro_documento"
                  placeholder="Ej: 49586743"
                  className="nro_doc--input"
                />
                {errors.nro_documento && touched.nro_documento ? (
                  <div className="error--alerta">
                    <i>{errors.nro_documento}</i>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="nombre_apellidos container-form">
              <div className="campo">
                <label htmlFor="ap_paterno">
                  Apellido Paterno <span>*</span>
                </label>
                <Field
                  type="text"
                  id="ap_paterno"
                  name="ap_paterno"
                  placeholder="Ej: Vega"
                />
                {errors.ap_paterno && touched.ap_paterno ? (
                  <div className="error--alerta">
                    <i>{errors.ap_paterno}</i>
                  </div>
                ) : null}
              </div>
              <div className="campo">
                <label htmlFor="ap_materno">
                  Apellido Materno <span>*</span>
                </label>
                <Field
                  type="text"
                  id="ap_materno"
                  name="ap_materno"
                  placeholder="Ej: Solis"
                />
                {errors.ap_materno && touched.ap_materno ? (
                  <div className="error--alerta">
                    <i>{errors.ap_materno}</i>
                  </div>
                ) : null}
              </div>
              <div className="campo">
                <label htmlFor="nombres">
                  Nombre <span>*</span>
                </label>
                <Field
                  type="text"
                  id="nombres"
                  name="nombres"
                  placeholder="Ej: Juan Carlos"
                />
                {errors.nombres && touched.nombres ? (
                  <div className="error--alerta">
                    <i>{errors.nombres}</i>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="tel-email-direccion container-form">
              <div className="campo">
                <label htmlFor="email">Correo</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ej: correo@correo.com"
                />
                {errors.email && touched.email ? (
                  <div className="error--alerta">
                    <i>{errors.email}</i>
                  </div>
                ) : null}
              </div>
              <div className="campo">
                <label htmlFor="telefono">
                  Teléfono <span>*</span>
                </label>
                <Field
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Ej: 987654321"
                />
                {errors.telefono && touched.telefono ? (
                  <div className="error--alerta">
                    <i>{errors.telefono}</i>
                  </div>
                ) : null}
              </div>
              <div className="campo">
                <label htmlFor="direccion">
                  Dirección <span>*</span>
                </label>
                <Field
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Ej: Av. Los Pinos"
                />
                {errors.direccion && touched.direccion ? (
                  <div className="error--alerta">
                    <i>{errors.direccion}</i>
                  </div>
                ) : null}
              </div>
            </div>
            <h2>Datos del Documento</h2>
            <div className="container-form">
              <div className="campo doc">
                <label>
                  Documento <span>*</span>
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
              <div className="campo tramite">
                <label htmlFor="tramite">
                  Trámite a realizar <span>*</span>
                </label>
                <Field
                  type="text"
                  id="tramite"
                  name="tramite"
                  placeholder="Ej. Solicito información de ----"
                />
                {errors.tramite && touched.tramite ? (
                  <div className="error--alerta">
                    <i>{errors.tramite}</i>
                  </div>
                ) : null}
              </div>
              <div className="campo comentario">
                <label htmlFor="comentario">Comentario</label>
                <Field as="textarea" id="comentario" name="comentario" />
              </div>
            </div>
            <button className="btn btn-azul" type="submit">
              Enviar
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormMesaPartes;
