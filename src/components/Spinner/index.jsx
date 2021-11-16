import React from 'react';
import './main.css';

const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="sk-chase">
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
    </div>
  </div>
);

Spinner.propTypes = {

};

export default Spinner;
