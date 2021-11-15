import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getFirestore, collection, query, getDocs,
} from 'firebase/firestore';
import FirebaseApp from '../../config/configFirebase';
import ModalProduct from '../NewProduct';

const Inventario = () => {
  const firestore = getFirestore(FirebaseApp());
  const [modalProduct, setModalProduct] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inventario, setInventario] = useState([]);
  useEffect(async () => {
    try {
      const q = query(collection(firestore, 'inventario'));
      const querySnapshot = await getDocs(q);
      // setInventario(querySnapshot.docs);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setInventario((prevState) => [...prevState, doc.data()]);
      });
    } catch (error) {
      console.log('error', error.message);
    }
  }, []);
  return (
    <>
      {modalProduct ? (<ModalProduct setModalProduct={setModalProduct} />) : null}
      <div className="w-10/12 m-auto mt-20">
        <div className="w-1/2 m-auto my-14">
          <h1 className="text-center">Inventarios L</h1>
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
        <div className="w-10/12 m-auto">
          {inventario.length > 0 ? (
            inventario.map((product) => (
              <div className="w-full py-12" key={product.id}>
                <div className="w-full flex flex-row justify-between">
                  <div className="w-1/2">
                    <p className="text-lg">Producto</p>
                    <h1 className="text-center">{product.name}</h1>
                  </div>
                  <div className="w-1/2">
                    <p className="text-lg">Precio</p>
                    <h1 className="text-center">{product.price}</h1>
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div className="w-1/2">
                    <p className="text-lg">Stock</p>
                    <h1 className="text-center">{product.quantity}</h1>
                  </div>
                  <div className="w-1/2">
                    <p className="text-lg">Categoria</p>
                    <h1 className="text-center">{product.category}</h1>
                  </div>
                </div>
              </div>
            ))
          ) : ('No hay Products')}

        </div>
      </div>
    </>
  );
};

export default Inventario;
