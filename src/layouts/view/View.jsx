import React from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import './view.scss';

const View = ({ children }) => {
  return (
    <div className="l_view__wrapper">
      <Header />
      <div className="l_view__container">{children}</div>
      <Footer />
    </div>
  );
};

export default View;
