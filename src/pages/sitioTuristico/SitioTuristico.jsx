import React from 'react';
import './sitioTuristico.scss';

const SitioTuristico = () => {
  return (
    <div className="sitioTuristico container">
      <div className="imagen-turismo">
        <h3>PETROGLIFOS DE PARATUSHIALI</h3>
        <img
          src="https://elcomercio.pe/resizer/V6eaEbZZkUvzZG99_cmCMQPi0Ig=/1200x900/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/UXWVHAY57JAL3KDHLBF6D5SCH4.jpg"
          alt=""
        />
      </div>
      <hr />
      <div className="descripcion">
        <h4>DESCRIPCIÓN:</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
          distinctio tempore corporis suscipit ipsam quaerat, labore similique,
          harum qui repudiandae deleniti voluptatem iusto quas reiciendis
          laborum nam. Ipsa, quibusdam veritatis?Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Iste mollitia hic unde nostrum illo
          molestiae sequi animi, itaque libero natus quasi est, officiis
          officia. Incidunt similique nulla voluptatibus temporibus culpa!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
          accusantium, quibusdam corporis eveniet minus temporibus magni
          veritatis eligendi unde explicabo facere debitis, facilis ut vero
          expedita non reiciendis laboriosam sequi?
        </p>
      </div>
      <hr />
      <div className="ubicacion-turismo">
        <h3>¿CÓMO LLEGAR ?</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984401.860677754!2d-76.71054263633057!3d-12.777379133506415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916e7fcd44472095%3A0x64e5b964d5d9b1b2!2sHuanacaure!5e0!3m2!1ses-419!2spe!4v1640013197180!5m2!1ses-419!2spe"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default SitioTuristico;
