import { Navigate, Route, Routes } from 'react-router-dom';
import View from '../layouts/view/View';
import Home from '../pages/home/Home';
import CentroPoblado from '../pages/centroPoblado/CentroPoblado';
import MesaPartesFront from '../pages/mesaPartes/front/MesaPartesFront';
import SitioTuristico from '../pages/sitioTuristico/SitioTuristico';
import Transparencia from '../pages/transparencia/Transparencia';
import Municipio from '../pages/municipio/Municipio';

const DashboardRoutes = () => {
  return (
    <>
      <View>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/municipio" element={<Municipio />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/centro-poblado" element={<CentroPoblado />} />
          <Route path="/mesa-partes" element={<MesaPartesFront />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </View>
    </>
  );
};

export default DashboardRoutes;
