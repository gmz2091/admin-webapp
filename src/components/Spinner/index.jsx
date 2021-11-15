import React from 'react';
import './main.css';

const Spinner = () => (
  <div className="w-screen min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 fixed">
    <div className="spinner">
      <div className="dot1" />
      <div className="dot2" />
    </div>

  </div>
);

Spinner.propTypes = {

};

export default Spinner;
