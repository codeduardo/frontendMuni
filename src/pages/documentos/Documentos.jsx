import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormDocumentos from '../../components/FormDocumentos/FormDocumentos';
import { listTipoDocumentos } from '../../redux/actions/tiposDocumentosActions';
import ModalAdd from './Modal/ModalAdd';
import './documentos.scss';
import { Table } from 'antd';
import { columns } from './DocumentosBox/columns';
import { listDocumentos } from '../../redux/actions/documentosActions';

const Documentos = () => {
  const dispatch = useDispatch();
  const tiposDocumentoState = useSelector((state) => state.TipoDocumento);

  const DocumentoState = useSelector((state) => state.Documento);
  const { documentos } = DocumentoState;

  const [texto, setTexto] = useState('');
  const [dataDocumentos, SetDataDocumentos] = useState([]);

  const obtenerNombre = async (id, nombre) => {
    setTexto(nombre);
    if (nombre !== texto) {
      SetDataDocumentos(documentos);
    }
    const filtrado = documentos.filter(
      (documento) => documento.tipo._id === id
    );
    SetDataDocumentos(filtrado);
  };

  useEffect(() => {
    dispatch(listDocumentos(SetDataDocumentos));
    dispatch(listTipoDocumentos());
  }, [dispatch]);

  return (
    <div className="documentos ">
      <h2 className="title">Documentos de Transparencia</h2>
      <ModalAdd />

      <div className="cajas">
        {tiposDocumentoState.documentos
          ? tiposDocumentoState.documentos.map((doc) => (
              <button key={doc.name}>
                {doc.name}
                <span onClick={() => obtenerNombre(doc._id, doc.name)}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3176/3176261.png"
                    alt=""
                  />
                </span>
              </button>
            ))
          : null}
      </div>

      <div className="botton-content" style={{ marginTop: '30px' }}>
        <div className="left-content">
          {texto ? (
            <h3 style={{ textTransform: 'uppercase' }}>{texto}</h3>
          ) : (
            <h3>Documentos</h3>
          )}
          <div className="box">
            <Table
              columns={columns}
              dataSource={dataDocumentos}
              pagination={{
                pageSize: 4,
              }}
              rowKey={(render) => render._id}
            ></Table>
          </div>
        </div>
        <div className="right-content">
          <h3>Agregar Documento</h3>
          <FormDocumentos />
        </div>
      </div>
    </div>
  );
};

export default Documentos;
