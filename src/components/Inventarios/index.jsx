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
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventario.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className="flex-shrink-0 h-10 w-10"
                                >
                                  <img className="h-10 w-10" src={product.image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.price}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <p
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : ('No hay Products')}
        </div>
      </div>
    </>
  );
};

export default Inventario;
