import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDocumentos } from '../../redux/actions/documentosActions';
import { listTipoDocumentos } from '../../redux/actions/tiposDocumentosActions';
import { Table } from 'antd';
import { columns } from './Documentos/columns';

import './transparencia.scss';

const Transparencia = () => {
  const dispatch = useDispatch();
  const tiposDocumentoState = useSelector(
    (state) => state.TipoDocumento.documentos
  );

  const DocumentoState = useSelector((state) => state.Documento);
  const { documentos } = DocumentoState;

  const [texto, setTexto] = useState('');

  const [dataDocumentos, SetDataDocumentos] = useState([]);

  const obtenerNombre = (nombre, id) => {
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
    <div className="transparencia container">
      <div className="transparencia-tipos">
        <img src="./img/transparencia1.jpg" alt="" />
        <div className="titulo">
          <h1>Portal de Transparencia</h1>
          <a href="/transparencia">transparencia</a>
          <a href="#secciones">Documentos</a>
        </div>

        <div id="secciones" className="documentos">
          <div className="cards">
            {tiposDocumentoState
              ? tiposDocumentoState.map((doc) => (
                  <div className="card" key={doc.name}>
                    <h3> {doc.name} </h3>
                    <p>{doc.description}</p>
                    <a style={{ color: '#7C4DFF' }}>Ver Documentos</a>
                    <img src="./img/documentos.png" alt="" />
                    <button onClick={() => obtenerNombre(doc.name, doc._id)}>
                      {' '}
                      Ver Documentos
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>

      <div id="documentos" className="contenido-documento">
        {texto ? (
          <div className="descripcion">
            <h2
              style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: '700',
              }}
            >
              {texto}
            </h2>
          </div>
        ) : (
          <h2 style={{ textAlign: 'center' }}>DOCUMENTOS DE TRANSPARENCIA</h2>
        )}
        <div className="table">
          <Table
            columns={columns}
            dataSource={dataDocumentos}
            pagination={{
              pageSize: 8,
            }}
            rowKey={(render) => render._id}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default Transparencia;
