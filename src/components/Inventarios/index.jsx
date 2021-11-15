import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import {
//   getFirestore, collection, query, getDocs,
// } from 'firebase/firestore';
// import FirebaseApp from '../../config/configFirebase';
import ModalProduct from '../NewProduct';
import { getInventarioData, deletdProduct } from '../../functions/functionsFirebase';

const Inventario = () => {
  const [editProduc, setEditProduc] = useState(false);
  // const firestore = getFirestore(FirebaseApp());
  const [modalProduct, setModalProduct] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inventario, setInventario] = useState([]);

  const getData = async () => {
    const result = await getInventarioData();
    setInventario(result.docs);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {modalProduct ? (
        <ModalProduct
          setModalProduct={setModalProduct}
          getData={getData}
          editProduc={editProduc}
        />
      ) : null}
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
                          <th scope="col" className="relative px-6 py-3">
                            {/* <span className="sr-only">Edit</span> */}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventario.map((product) => (
                          <tr key={product.data().id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className="flex-shrink-0 h-10 w-10"
                                >
                                  <img className="h-12 w-14" src={product.data().image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.data().name}</div>
                                  <div className="text-sm text-gray-500">{product.data().description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.data().price}</div>
                              <div className="text-sm text-gray-500">{product.data().category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.data().description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditProduc(true);
                                  setModalProduct(!modalProduct);
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => {
                                  deletdProduct(product.id);
                                  getData();
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
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
