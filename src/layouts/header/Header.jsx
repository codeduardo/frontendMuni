import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const location = useLocation();
  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-logo" onClick={handleLogoClick}>
          <img src="img/logo.png" alt="" />
          <div className="titulo">
            <p>
              MUNICIPALIDAD DEL CENTRO POBLADO
              <span>PARATUSHIALI</span>
            </p>
            <p>¡Con un futuro con progreso para todos!</p>
          </div>
        </div>
        <div className="header-nav">
          <div className="nav">
            <Link
              to="/"
              className={location.pathname === '/' ? 'link active' : 'link'}
            >
              <i className="fas fa-home"></i>
              Home
            </Link>
            <Link
              to="centro-poblado"
              className={
                location.pathname === '/centro-poblado' ? 'link active' : 'link'
              }
            >
              <i className="fas fa-map-marked-alt"></i>
              Centro Poblado
            </Link>
            <Link
              to="/transparencia"
              className={
                location.pathname === '/transparencia' ? 'link active' : 'link'
              }
            >
              <i className="fas fa-folder"></i>
              Transparencia
            </Link>
            <Link
              to="/municipio"
              className={
                location.pathname === '/municipio' ? 'link active' : 'link'
              }
            >
              <i className="fas fa-university"></i>
              Municipio
            </Link>
            <Link
              to="/mesa-partes"
              className={
                location.pathname === '/mesa-partes' ? 'link active' : 'link'
              }
            >
              <i className="fas fa-file-signature"></i>
              Mesa de Partes
            </Link>
            <Link
              to="/login"
              className={
                location.pathname === '/login' ? 'link active' : 'link'
              }
            >
              <i className="fas fa-sign-in-alt"></i>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
