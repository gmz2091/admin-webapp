import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import {
//   getFirestore, collection, query, getDocs,
// } from 'firebase/firestore';
// import FirebaseApp from '../../config/configFirebase';
import ModalProduct from '../NewProduct';
import { getInventarioData, deletdProduct } from '../../functions/functionsFirebase';
import './main.css';

const Inventario = () => {
  const [editProduc, setEditProduc] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [prodEdit, setProdEdit] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  // const firestore = getFirestore(FirebaseApp());
  const [modalProduct, setModalProduct] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inventario, setInventario] = useState([]);

  const getData = async () => {
    try {
      setShowLoader(true);
      const result = await getInventarioData();
      setInventario(result.docs);
    } catch (error) {
      console.log(error);
    }
    setShowLoader(false);
  };

  useEffect(async () => {
    await getData();
  }, []);

  return (
    <>
      {modalProduct ? (
        <ModalProduct
          setModalProduct={setModalProduct}
          getData={getData}
          editProduc={editProduc}
          prodEdit={prodEdit}
        />
      ) : null}
      <div className="w-1/2 m-auto my-14">
        <p className="text-center text-2xl">Inventarios Lenteopia</p>
      </div>
      <div className="w-10/12 m-auto">
        <Link to="/" className="flex flex-wrap items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <p className="ml-2 py-2 rounded">Home</p>
        </Link>
      </div>
      <div className="w-10/12 m-auto mt-20 bg-white pb-16 rounded-md">
        <div className="w-full py-12">
          <div className="w-10/12 m-auto flex flex-wrap items-center justify-between">
            <div className="relative flex flex-wrap items-center w-35">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search Product" className="rounded border border-gray-300 focus:outline-none pr-3 pl-16 py-2 w-full" />
            </div>
            <button
              type="button"
              className="bg-custom-blue px-4 py-2 rounded-md text-white mt-4 lg:mt-0"
              onClick={() => {
                setModalProduct(!modalProduct);
              }}
            >
              Nuevo Producto

            </button>
          </div>
        </div>
        {showLoader ? (
          <div className="w-10/12 m-auto md:w-full ml-4 flex flex-wrap md:flex-nowrap items-center justify-around">
            <div className="skeleton">
              <div className="skeleton-left flex1">
                <div className="square" />
              </div>
              <div className="skeleton-right flex2">
                <div className="line h17 w40 m10" />
                <div className="line" />
                <div className="line h8 w50" />
                <div className="line  w75" />
              </div>
            </div>
            <div className="skeleton">
              <div className="skeleton-left flex1">
                <div className="square" />
              </div>
              <div className="skeleton-right flex2">
                <div className="line h17 w40 m10" />
                <div className="line" />
                <div className="line h8 w50" />
                <div className="line  w75" />
              </div>
            </div>
          </div>
        ) : (
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
                              className="px-6 py-3 text-left text-xs font-medium
                               text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Precio
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Stock
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              F/Azul
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Description
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
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{product.data().quantity}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  N/A
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.data().description}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setProdEdit(product.data());
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
        )}

      </div>
    </>
  );
};

export default Inventario;
