import { useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './turismo.scss';
import { useDispatch, useSelector } from 'react-redux';
import ModalCreate from './Modal/ModalCreate';
import ModalEditTurismo from './Modal/ModalEditTurismo';
import ModalTurismo from './Modal/ModalTurismo';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  eliminarTurismo,
  listarTurismos,
} from '../../redux/actions/turismoActions';

const Turismo = () => {
  const dispatch = useDispatch();
  const turismoState = useSelector((state) => state.Turismo);
  const MySwal = withReactContent(SweetAlert);

  const { loading, turismos } = turismoState;

  useEffect(() => {
    dispatch(listarTurismos());
  }, [dispatch]);

  const elminarHandler = (id) => {
    MySwal.fire({
      title: '¿Estás seguro de eliminar el sitio turístico?',
      text: 'Una vez eliminado no podrás recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        dispatch(eliminarTurismo(id));
        MySwal.fire(
          'Eliminado!',
          'El sitio turístico ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  return (
    <div className="turismo--back">
      <h2 className="title">Turismo Paratushiali</h2>
      <Row>
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
          {turismos.length === 0 ? (
            <h2>No hay sitios turísticos agregue uno</h2>
          ) : (
            turismos.map((turismo) => (
              <Col key={turismo.name}>
                <Card
                  style={{ width: 350 }}
                  hoverable
                  cover={
                    <img
                      alt={turismo.name}
                      src={turismo.img[0] && turismo.img[0]}
                    />
                  }
                  actions={[
                    <Row justify="center">
                      <Col>
                        <ModalEditTurismo idTurismo={turismo._id} />
                      </Col>
                    </Row>,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => elminarHandler(turismo._id)}
                    />,
                  ]}
                >
                  <Card.Meta title={turismo.name.toUpperCase()} />
                  <Row>
                    <Col>
                      <ModalTurismo turismo={turismo} />
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

export default Turismo;
