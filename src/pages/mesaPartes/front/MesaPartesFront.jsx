import { useSelector } from 'react-redux';
import FormMesaPartes from '../../../components/FormMesaPartesFront/FormMesaPartes';
import './mesaPartesFront.scss';

const MesaPartesFront = () => {
  const tramites = useSelector((state) => state.Tramite);
  const { msg, isError } = tramites;

  return (
    <div className="mesa-partes-front container">
      {msg && (
        <p className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
          {msg}
        </p>
      )}
      <section className="indicaciones">
        <h2 className="indicaciones_titulo">Indicaciones</h2>
        <ul className="items">
          <li>
            Estimados usuarios, para mayor facilidad, se ha puesto a su
            disposición este formulario, que le permitirá el envío de documentos
            a la Municipalidad del Centro Poblado Paratushiali.
          </li>
          <li>
            Esta modalidad de recepción estará activa en tanto dura la
            emergencia nacional declarada por D.S. Nº 044-2020-PCM.
          </li>
          <li>
            El horario de recepción de documentos es de 08:00 hasta las 5:00
            p.m. de Lunes a Viernes. El envío del formulario no genera
            aceptación del mismo, la remisión de la constancia de ingreso
            validará su recepción, si no recibe su constancia por favor
            comunicarse al 313-4444 anexo 348 o al correo
            mesadepartes@muniparatushiali.gob.pe
          </li>
        </ul>
      </section>
      <section className="formulario_mp">
        <FormMesaPartes />
      </section>
    </div>
  );
};

export default MesaPartesFront;
