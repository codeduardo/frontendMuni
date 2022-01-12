import './sideBar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/loginActions';

const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const salir = () => {
    dispatch(logout());
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Escudo_de_Tumbes.png/522px-Escudo_de_Tumbes.png"
          alt=""
        />
        <h1>
          Muni<span>Admin</span>
        </h1>
      </div>

      <ul className="links">
        <li>
          <Link
            className={
              location.pathname === '/admin' ||
              location.pathname === '/admin/mesa-de-partes'
                ? 'link link--side active'
                : 'link link--side'
            }
            to="/admin/mesa-de-partes"
          >
            <i className="fas fa-paste"></i>
            Mesa de Partes
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === '/admin/documentos'
                ? 'link link--side active'
                : 'link link--side'
            }
            to="/admin/documentos"
          >
            <i className="fas fa-file"></i>
            Documentos
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === '/admin/eventos'
                ? 'link link--side active'
                : 'link link--side'
            }
            to="/admin/eventos"
          >
            <i className="fas fa-calendar-week"></i>
            Eventos
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === '/admin/turismo'
                ? 'link link--side active'
                : 'link link--side'
            }
            to="/admin/turismo"
          >
            <i className="fas fa-route"></i>
            Turismo
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === '/admin/red-administrativa'
                ? 'link link--side active'
                : 'link link--side'
            }
            to="/admin/red-administrativa"
          >
            <i className="fas fa-users"></i>
            Red Administrativa
          </Link>
        </li>
        <li className="salir">
          <Link className="link link--side" to="#" onClick={salir}>
            <i className="fas fa-sign-out-alt"></i>
            Salir
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
