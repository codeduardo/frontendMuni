import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRa } from '../../redux/actions/redAdministrativaActions';
import './municipio.scss';

const Municipio = () => {
  const dispatch = useDispatch();
  const listRa = useSelector((s) => s.RedAdministrativa);
  console.log(listRa);
  useEffect(() => {
    dispatch(getRa());
  }, [dispatch]);
  return (
    <div className="municipio container">
      <div className="img">
        <img src="img/foto.png" alt="" />
      </div>
      <div className="municipalidad">
        <h2>
          MUNICIPALIDAD DEL CENTRO POBLADO DE <span>PARATUSHIALI</span>{' '}
        </h2>
        <p>
          El centro poblado Paratushiali fue fundado el 6 de febrero de 1962
          sobre un área de 4,900 hectáreas, en las estribaciones de la
          Cordillera de los Andes, a quince kilómetros de la costa del Océano
          Pacífico, a 15° 5′ de longitud sur y 75° 57′ de longitud oeste. Su
          altitud varía entre los 180 y 250 mts. sobre el nivel del mar. Tiene
          por limites hacia el norte el distrito de Ate, al sur Villa María del
          Triunfo y Pachacamac, al este Pachacamac y al oeste Santiago de Surco.
        </p>
      </div>
      <hr className="hr-primero" />
      <div className="caracteristicas">
        <div className="finalidad">
          <h2>FINALIDAD</h2>
          <p>
            Mediante un Sistema de Gestión de la Calidad basado en la mejora
            continua, se prentende alcanzar los siguientes objetivos : Gestionar
            y administrar la consecución de recursos físicos y financieros
            adecuados para la prestación de los servicios. Disponer de personal
            competente para la realización de sus actividades. Generar una
            cultura de trabajo en equipo y de mejoramiento continuo en la
            Administración Municipal de Sabaneta. Generar procesos de desarrollo
            institucional, de infraestructura, social y de convivencia.
            Satisfacer las necesidades y expectativas de la comunidad según la
            constitución y Las leyes.
          </p>
        </div>
        <div className="valores">
          <div className="mision">
            <h2>MISIÓN</h2>
            <p>
              Somos una institución pública que brinda servicios de calidad a
              todos los pobladores del centro Poblado Paratushiali buscando
              actuar con acciones de calidad en pro y beneficio de nuestros
              pobladores.
            </p>
          </div>
          <div className="vision">
            <h2>VISIÓN</h2>
            <p>
              El ciudadano de Paratushiali, al año 2030, vive en una ciudad
              segura, integrada, inteligente y ecológicamente sostenible. Un
              distrito con un desarrollo urbano ordenado y actividades
              económicas especializadas y focalizadas acorde con su
              residencialidad, que goza de elevados niveles de desarrollo
              humano.
            </p>
          </div>
        </div>
      </div>
      <div className="alcalde-muni">
        <div className="contenido">
          <img src="img/alcalde-muni.png" alt="" />
          <div className="descripcion">
            <h3>Estimados vecinos paratushialinos:</h3>
            <ul>
              <li>
                Al iniciar este periodo de gestión municipal 2019 - 2022, junto
                con el concejo de regidores y funcionarios, nos une el
                compromiso de trabajar arduamente por el desarrollo del Centro
                Poblado Paratushiali.
              </li>
              <li>
                Nuestro objetivo principal es trabajar de manera conjunta y
                coordinada con las organizaciones de base, para incentivar la
                participación vecinal y promover proyectos que beneficien el
                desarrollo de sus sectores.
              </li>
              <li>
                Estamos trabajando para convertir nuestro puerto, en una ciudad
                limpia, segura y ordenada; también, estamos promoviendo espacios
                educativos, deportivos y culturales en beneficio la niñez y
                juventud de Paita.
              </li>
              <li>
                La seguridad es un derecho de todos, y también es parte de
                nuestra responsabilidad. Es así que estamos implementando la
                Subgerencia de Serenazgo con más y mejor recursos humanos y
                logísticos.
              </li>
              <li>
                Hemos gestionado la capacitación de nuestros agentes, así como
                la repotencialización de las unidades y cámaras de video
                vigilancia, a fin fortalecer la seguridad ciudadana.
              </li>
              <li>
                Con respecto al sector transporte, hemos iniciado una campañas
                de formalización que nos permitan contar con un registro de
                identificación de todos los transportistas población y
                garantizar que los usuarios se trasladen de manera más segura.
              </li>
              <li>
                En estos primeros 100 días, nuestra prioridad ha sido recuperar
                nuestra ciudad, de la insalubridad que la amenazaba.
              </li>
              <li>
                Es por eso que, desde el primer día de la gestión ejecutamos un
                plan de contingencia, gracias al cual logramos erradicar el 80
                por ciento de los puntos críticos y normalizando el recorrido de
                los camiones recolectores.
              </li>
              <li>
                Finalmente, quiero recordarles que el desarrollo de Paita es una
                tarea de todos, y que trabajando articuladamente, autoridades y
                población, podremos lograr grandes cosas en beneficio de nuestra
                querida Paita.
              </li>
              <li>Recuerden que: ¡Juntos gobernamos mejor!</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="red-administrativa">
        <h2>RED ADMINISTRATIVA</h2>
        <div className="cards">
          {listRa.redAdministrativa
            ? listRa.redAdministrativa.map((col) => (
                <div className="persona">
                  <img src={col.img} alt="no encontrado" />
                  <p style={{ textTransform: 'capitalize', margin: 0 }}>
                    {col.profesion}
                  </p>
                  <h3 style={{ textTransform: 'capitalize', margin: 0 }}>
                    {col.fullName}
                  </h3>
                  <p style={{ margin: 0 }}>{col.rol}</p>

                  <p style={{ color: '#212121', fontWeight: '200' }}>
                    {col.email}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Municipio;
