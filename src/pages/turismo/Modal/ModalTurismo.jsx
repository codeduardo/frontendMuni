import { Button, Carousel, Modal } from 'antd';
import { useState } from 'react';
import {
  CaretRightOutlined,
  CloseOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import '../turismo.scss';

const ModalTurismo = ({ turismo }) => {
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
        Ver más... <CaretRightOutlined />
      </Button>
      <Modal
        title="TURISMO PARATUSHIALI"
        closeIcon={<CloseOutlined />}
        visible={visible}
        centered
        footer={null}
        onCancel={() => setVisible(!visible)}
        width={900}
      >
        <Carousel autoplay>
          {turismo.img.map((img) => (
            <div key={turismo._id} className="carousel_turismo">
              <img src={img} alt={turismo.name} />
            </div>
          ))}
        </Carousel>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: turismo.description }}
        />
        <a
          className="ubicacion_turismo"
          href={turismo.ubicacion}
          target="_blank"
          rel="noreferrer"
        >
          <EnvironmentOutlined />
          Ir Ubicacion
        </a>
      </Modal>
    </>
  );
};

export default ModalTurismo;
