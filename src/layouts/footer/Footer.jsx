import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <div className="footer container">
      <div className="footer-logo">
        <div className="red_social_1">
          <div className="red_social_items">
            <div className="red_social_item facebook">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="red_social_item twitter">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="red_social_item instagram">
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
        <h2>C.P.PARATUSHIALI</h2>
        <div className="red_social_2">
          <div className="red_social_items">
            <div className="red_social_item whatsapp">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div className="red_social_item messenger">
              <i className="fab fa-facebook-messenger"></i>
            </div>
            <div className="red_social_item email">
              <i className="fas fa-at"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="box">
          <i className="fas fa-comments"></i>
          <h3>CORREO</h3>
          <p>muniparatushiali@gmail.com</p>
        </div>
        <div className="box">
          <i className="fas fa-phone-alt"></i>
          <h3>CONTACTO</h3>
          <p>
            <span>991464009 </span>
            <span>930731328 </span>
            <span>985653573</span>
          </p>
        </div>
        <div className="box">
          <i className="far fa-compass"></i>
          <h3>UBICACIÓN</h3>
          <p>
            Av. El Sol s/n <span>Paratushiali</span>{' '}
          </p>
        </div>
        <div className="box">
          <i className="fas fa-calendar-alt"></i>
          <h3>HORARIO</h3>
          <p>
            <span>Lunes - Viernes </span> 8:00 a.m. - 5:00 p.m.
          </p>
        </div>
      </div>

      <div className="copyright">
        <p>
          Municipalidad del centro poblado Paratushiali Copyright ©
          <span>Todos los derechos reservados</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
