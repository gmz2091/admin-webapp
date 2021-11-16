import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WarningAlert = ({ handleSubmitProduct, setWarning }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, setstate] = useState(null);
  return (
    <div className="fixed z-50 flex items-center justify-center w-screen min-h-screen bg-black bg-opacity-80 top-0 animate__animated animate__faster animate__fadeIn">
      <div className="md:w-1/2 w-10/12 m-auto items-center justify-center bg-white bg-opacity-70 rounded px-12 py-4">
        <p className="text-center my-12 text-xl">Segura que desea guardar los datos?</p>
        <div className="flex justify-between">
          <button
            type="button"
            className="sm:w-1/4 w-full bg-green-400 py-2"
            onClick={() => {
              handleSubmitProduct();
              setWarning(false);
            }}
          >
            Guardar
          </button>
          <button
            type="button"
            className="sm:w-1/4 w-full bg-red-400 py-2"
            onClick={() => {
              setWarning(false);
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

WarningAlert.propTypes = {
  handleSubmitProduct: PropTypes.func.isRequired,
  setWarning: PropTypes.func.isRequired,
};

export default WarningAlert;
