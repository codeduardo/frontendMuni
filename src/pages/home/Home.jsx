import React, { useEffect } from 'react';
import { Card, Carousel, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarOutlined } from '@ant-design/icons';

import './home.scss';
import { listarEventos } from '../../redux/actions/eventosActions';
import ModalEvento from '../eventos/Modal/ModalEvento';

const Home = () => {
  const dispatch = useDispatch();
  const eventosState = useSelector((state) => state.Eventos);
  const { loading, eventos } = eventosState;

  useEffect(() => {
    dispatch(listarEventos());
  }, [dispatch]);
  return (
    <div className="home container">
      <div className="slides">
        <Carousel autoplay>
          {loading ? (
            <img
              src="https://www.industriasgsl.com/pub/static/frontend/Magento/luma/es_MX/Magefan_Blog/images/default-no-image.png"
              alt=""
            />
          ) : (
            eventos.length > 0 &&
            eventos[1].img.map((i) => <img key={i} src={i} alt="" />)
          )}
        </Carousel>
      </div>
      <div className="redes_sociales">
        <div className="redes_sociales_items">
          <div className="redes_sociales_item facebook">
            <i className="fab fa-facebook-f"></i>
          </div>
          <div className="redes_sociales_item twitter">
            <i className="fab fa-twitter"></i>
          </div>
          <div className="redes_sociales_item instagram">
            <i className="fab fa-instagram"></i>
          </div>
          <div className="redes_sociales_item whatsapp">
            <i className="fab fa-whatsapp"></i>
          </div>
          <div className="redes_sociales_item messenger">
            <i className="fab fa-facebook-messenger"></i>
          </div>
          <div className="redes_sociales_item email">
            <i className="fas fa-at"></i>
          </div>
        </div>
      </div>
      <div className="alcalde">
        <div className="foto">
          <img src="img/alcalde.png" alt="" />
        </div>
        <div className="mensaje">
          Al iniciar una nueva gestión municipal, reafirmo mi compromiso de
          trabajar incansablemente por el Desarrollo de Nuestro Distrito y
          lograr el progreso que todos los vecinos anhelamos dentro del marco de
          una gestión de absoluta transparencia y amplia convocatoria a la
          sociedad civil organizada.
        </div>
      </div>
      <div className="eventos">
        <h2>
          <i className="fas fa-calendar-week"></i> Eventos y/o Actividades
        </h2>
        <div className="cards">
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
            eventos.length > 0 &&
            eventos.map((evento) => (
              <Card
                key={evento._id}
                style={{ width: 300 }}
                cover={<img src={evento.img[0]} alt={evento.title} />}
                actions={[
                  <span>
                    {evento.fecha_evento} <CalendarOutlined />
                  </span>,
                ]}
              >
                <Card.Meta title={evento.title} />
                <Row justify="end">
                  <Col>
                    <ModalEvento evento={evento} />
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="video">
        <iframe
          width="560"
          height="400"
          src="https://www.youtube.com/embed/QltPDkf_-9s"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
