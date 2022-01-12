import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './centroPoblado.scss';
import { Card, Carousel, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listarTurismos } from '../../redux/actions/turismoActions';
import ModalTurismo from '../turismo/Modal/ModalTurismo';

const CentroPoblado = () => {
  const dispatch = useDispatch();
  const turismoState = useSelector((state) => state.Turismo);
  const { turismos, loading } = turismoState;

  useEffect(() => {
    dispatch(listarTurismos());
  }, [dispatch]);

  return (
    <div className="centropoblado container">
      <section className="bienvenida">
        <div className="info">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  '<span>Bienvenidos a <span style="color: #27ae60;">PARATUSHIALI</span></span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  '<span>Disfrute su <span style="color: #27ae60;">VISITA</span></span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
            options={{ loop: true }}
          />
        </div>
      </section>
      <section className="historia">
        <div className="descripcion_historia">
          <h2>
            <i className="fas fa-history"></i> Historia
          </h2>
          <div className="descripcion_historia--parrafos">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              dolore laborum, officia delectus molestiae iusto quod nesciunt
              libero laboriosam in omnis dolorum, nihil ad modi?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              dolore laborum, officia delectus molestiae iusto quod nesciunt
              libero laboriosam in omnis dolorum, nihil ad modi?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              dolore laborum, officia delectus molestiae iusto quod nesciunt
              libero laboriosam in omnis dolorum, nihil ad modi?
            </p>
          </div>
        </div>
        <Carousel autoplay>
          <img
            src="https://scontent.flim14-1.fna.fbcdn.net/v/t1.6435-9/51531082_924217651119371_3105209819695415296_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEtmQ1BE_6equlFd6nbG3-Whi3ZjUQ9JB6GLdmNRD0kHviBbTksXhpl2WURulG31eYgNEipE1snDAOZ9v0jfTQZ&_nc_ohc=YQRFSFe0VG8AX_i-4hV&_nc_ht=scontent.flim14-1.fna&oh=00_AT-8co7xGFiBof5cemO0gOrddKnWG2g-rcPfVIUmaUt-4w&oe=61FE6406"
            alt=""
          />
          <img
            src="https://scontent.flim14-1.fna.fbcdn.net/v/t39.30808-6/252542683_416011073421766_5454218697490248911_n.jpg?_nc_cat=110&_nc_rgb565=1&ccb=1-5&_nc_sid=19026a&_nc_eui2=AeHm1B4f1UPXsPkX0eQYcuGWwFtzYdxKTLbAW3Nh3EpMtkNEQLhuAVIWQ8hyAA7VBHm451cHOgut_j8uIsg31hb1&_nc_ohc=XZIMiI5iZ8EAX8ayJrc&_nc_oc=AQmU6q6xkVitbZmB0h5Abgf_ca7LAGSaEyDcDN2Sekj4Wfk9PbbdmZwvG4nnRaZdDGE&_nc_ht=scontent.flim14-1.fna&oh=00_AT-zucLiO2PX2jR1dEEbYp2Nscdbn7rUXRCP8r-CuzvYMQ&oe=61DAFC0E"
            alt=""
          />
          <img
            src="https://scontent.flim14-1.fna.fbcdn.net/v/t39.30808-6/241263698_376637490692458_2791661384737724585_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeHhb4AEnnB0YWcOmTFhZ7UZN8HXRTMgD2s3wddFMyAPa_ydn_kDShmHd36TWZRymXMpwOd5U2Ccn6CmkAlduo1Z&_nc_ohc=PN0iC2FwY1cAX-se3ua&_nc_ht=scontent.flim14-1.fna&oh=00_AT-MQQrDLWpiEXdsFSa15nXxFRAem3AMIozhFEeCm9Q6RA&oe=61DC8798"
            alt=""
          />
          <img
            src="https://scontent.flim14-1.fna.fbcdn.net/v/t1.6435-9/183597685_301555128200695_2859442478889065619_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeF5SBIugit7b6Cd4yYaGTTWq_vHJfrknNmr-8cl-uSc2Rfy1NFEOBm8apsmT2Xt12vxV9YX6bd8fOY0wR_wY9qK&_nc_ohc=MIDpkZeZHjAAX8a07xq&_nc_ht=scontent.flim14-1.fna&oh=00_AT8WWjFS6ZbXQHaPjdR7pAKIk3-7r9NDn1E-Tct3FYd9qQ&oe=61FAF329"
            alt=""
          />
        </Carousel>
      </section>

      <section className="ubicacion">
        <div className="info">
          <div className="campo">
            <h3>Sede</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="campo">
            <h3>Horario de atención</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="campo">
            <h3>Central Telefónica</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="campo">
            <h3>Redes Sociales</h3>
            <div className="red-sociales">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-whatsapp-square"></i>
              <i className="fab fa-facebook-messenger"></i>
            </div>
          </div>
        </div>
        <iframe
          title="myFrame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.608000801615!2d-74.70237058562905!3d-11.29019933136008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910bc321a2bcc9dd%3A0xd419c681b891bcf5!2sPARATUSHIALI!5e0!3m2!1ses-419!2spe!4v1639102967557!5m2!1ses-419!2spe"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          height="450"
          width="100%"
        ></iframe>
      </section>
      <section className="turismo">
        <h2>Circuito Destino Paratushiali</h2>
        <Row gutter={[16, 16]} justify="center">
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
            turismos &&
            turismos.map((turismo) => (
              <Col key={turismo._id}>
                <Card
                  actions={[
                    <Row justify="center">
                      <Col>
                        <ModalTurismo turismo={turismo} />
                      </Col>
                    </Row>,
                  ]}
                >
                  <h3>{turismo.name}</h3>
                  <img src={turismo.img[0]} alt={turismo.name} />
                </Card>
              </Col>
            ))
          )}
        </Row>
      </section>
    </div>
  );
};

export default CentroPoblado;
