import './mesaPartes.scss';
import { Table, Input, Row, Col } from 'antd';
import { columnas } from './Column';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTramites } from '../../redux/actions/mesaPartesActions';

const { Search } = Input;

const MesaPartes = () => {
  const dispatch = useDispatch();
  const tramiteState = useSelector((state) => state.Tramite);
  const { tramites, loading } = tramiteState;
  const [dataTramites, setDataTramites] = useState([]);

  useEffect(() => {
    dispatch(listTramites(setDataTramites));
  }, [dispatch]);

  const onSearch = (value) => {
    if (value === '') {
      setDataTramites(tramites);
    }
    const busqueda = tramites.filter((tramite) => {
      const filtro = `${tramite.nombres} ${tramite.ap_paterno} ${
        tramite.ap_materno
      } ${tramite.nro_documento} ${tramite.createdAt.toString()}`;
      console.log(filtro);
      return filtro.toLowerCase().includes(value.toLowerCase());
    });
    console.log(busqueda);
    console.log(tramites);
    setDataTramites(busqueda);
  };
  const OnchageValueSearch = (e) => {
    if (e.target.value === '') {
      setDataTramites(tramites);
    }
  };
  return (
    <div className="mesa-partes">
      <h2 className="title">Documentos Recibidos</h2>
      {loading ? (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      ) : (
        <>
          <Row justify="end" style={{ marginBottom: '2rem' }}>
            <Col span={8}>
              <Search
                placeholder="Buscar por nombres, apellidos o N° de documento"
                onSearch={onSearch}
                onChange={OnchageValueSearch}
                enterButton
              />
            </Col>
          </Row>
          <Table
            columns={columnas}
            dataSource={dataTramites}
            rowKey={(render) => render._id}
          ></Table>
        </>
      )}
    </div>
  );
};

export default MesaPartes;
