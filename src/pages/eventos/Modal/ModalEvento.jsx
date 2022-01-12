import '../eventos.scss';
import { Button, Carousel, Modal } from 'antd';
import React, { useState } from 'react';
import {
  CaretRightOutlined,
  CloseOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const ModalEvento = ({ evento }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        type="link"
        style={{
          marginTop: '1rem',
          alignSelf: 'flex-end',
          padding: '0',
        }}
      >
        Ver más ...
        <CaretRightOutlined />
      </Button>
      <Modal
        title="EVENTOS PARATUSHIALI"
        closeIcon={<CloseOutlined />}
        visible={visible}
        centered
        footer={null}
        onCancel={() => setVisible(!visible)}
        width={900}
      >
        <Carousel autoplay>
          {evento.img.map((img) => (
            <div key={evento._id} className="carousel_evento">
              <img src={img} alt={evento.title} />
            </div>
          ))}
        </Carousel>
        <div className="descripcion_evento">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: evento.description }}
          />
          <p className="fecha">
            <CalendarOutlined /> {evento.fecha_evento}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ModalEvento;
