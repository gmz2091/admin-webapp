import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalProduct from '../NewProduct';

const Inventario = () => {
  const [modalProduct, setModalProduct] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inventario, setInventario] = useState([]);
  return (
    <>
      {modalProduct ? (<ModalProduct setModalProduct={setModalProduct} />) : null}
      <div className="w-10/12 m-auto mt-20">
        <div className="w-1/2 m-auto my-14">
          <h1 className="text-center">Inventarios</h1>
        </div>
        <Link to="/" className="bg-blue-400 px-4 py-2 rounded">Home</Link>
        <div className="w-full py-12">
          Products en Inventario
          <div>
            <button
              type="button"
              className="bg-green-400 px-4 py-2 mt-7"
              onClick={() => {
                setModalProduct(!modalProduct);
              }}
            >
              Nuevo Producto

            </button>
          </div>
        </div>
        {inventario.length > 0 ? ('Hay Products') : ('No hay Products')}
      </div>
    </>
  );
};

export default Inventario;
