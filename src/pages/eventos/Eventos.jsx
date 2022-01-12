import { useEffect } from 'react';
import { Card, Col, DatePicker, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './eventos.scss';
import moment from 'moment';
import ModalCreate from './Modal/ModalCreate';
import { useDispatch, useSelector } from 'react-redux';
import {
  eliminarEvento,
  listarEventos,
} from '../../redux/actions/eventosActions';
import ModalEvento from './Modal/ModalEvento';
import ModalEditEvento from './Modal/ModalEditEvento';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Eventos = () => {
  const dispatch = useDispatch();
  const eventosState = useSelector((state) => state.Eventos);
  const MySwal = withReactContent(SweetAlert);

  const { loading, eventos } = eventosState;

  useEffect(() => {
    dispatch(listarEventos());
  }, [dispatch]);

  const elminarHandler = (id) => {
    MySwal.fire({
      title: '¿Estás seguro de eliminar el evento?',
      text: 'Una vez eliminado no podrás recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        dispatch(eliminarEvento(id));
        MySwal.fire(
          'Eliminado!',
          'El evento ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  return (
    <div className="eventos--back">
      <h2 className="title">Lista de Eventos </h2>
      <Row gutter={8} align="middle">
        <Col>
          <ModalCreate />
        </Col>
      </Row>
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
        <Row gutter={[16, 16]} justify="center">
          {eventos.length === 0 ? (
            <h2>No hay Eventos Agregue uno</h2>
          ) : (
            eventos.map((evento) => (
              <Col key={evento.title}>
                <Card
                  style={{ width: 350 }}
                  hoverable
                  cover={
                    <img
                      alt={evento.title}
                      src={evento.img[0] && evento.img[0]}
                    />
                  }
                  actions={[
                    <DatePicker
                      defaultValue={moment(evento.fecha_evento)}
                      size="small"
                      bordered={false}
                      disabled={true}
                      format="DD/MM/YYYY"
                    />,
                    <Row justify="center">
                      <Col>
                        <ModalEditEvento idEvento={evento._id} />
                      </Col>
                    </Row>,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => elminarHandler(evento._id)}
                    />,
                  ]}
                >
                  <Card.Meta title={evento.title} />
                  <Row>
                    <Col>
                      <ModalEvento evento={evento} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default Eventos;
