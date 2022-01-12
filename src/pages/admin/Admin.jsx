import './admin.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import SideBar from '../../layouts/sideBar/SideBar';
import { logout } from '../../redux/actions/loginActions';
import MesaPartes from '../mesaPartes/MesaPartes';
import Documentos from '../documentos/Documentos';
import Eventos from '../eventos/Eventos';
import RedAdministrativa from '../redAdministrativa/RedAdministrativa';
import Turismo from '../turismo/Turismo';

const Admin = () => {
  const state = useSelector((state) => state.Auth);
  const { isAuthenticated } = state;
  const dispatch = useDispatch();

  if (isAuthenticated === false) {
    logout(dispatch);
    return <Navigate replace to="/login" />;
  }
  // const logoutUser = () => {
  //   logout(dispatch);
  // };

  return (
    <div className="admin">
      <SideBar />
      <Routes>
        <Route path="/" element={<MesaPartes />} />
        <Route path="/mesa-de-partes" element={<MesaPartes />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/red-administrativa" element={<RedAdministrativa />} />
        <Route path="/turismo" element={<Turismo />} />

        <Route path="/*" element={<Navigate to="/admin" />} />
      </Routes>
    </div>
  );
};

export default Admin;
