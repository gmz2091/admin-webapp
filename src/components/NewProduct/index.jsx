/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getFirestore, addDoc, collection,
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import WarningAlert from '../WarningAlert';
import FirebaseApp from '../../config/configFirebase';
import './main.css';

const ModalProduct = ({
  setModalProduct, getData,
}) => {
  const [checked, setChecked] = useState(false);
  const [warning, setWarning] = useState(false);
  const [file, setFile] = useState(undefined);
  const [errorFile, setErrorFile] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Firebase Utils
  const firestore = getFirestore(FirebaseApp());
  const storage = getStorage(FirebaseApp());

  useEffect(() => {
    // console.log(firestore, storage);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState(
    {
      name: '',
      description: '',
      price: '',
      quantity: '',
    },
  );

  const setID = () => {
    const id = Date.now();
    return id;
  };

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      createdAt: getDate(),
    });
  };

  const fielHandler = async (e) => {
    let urlDescarga;
    const files = e.target.files[0];
    if (files.type === 'image/jpeg' || files.type === 'image/png') {
      setShowSpinner(true);
      console.log('Subiendo Imagen');
      try {
        const archivoRef = ref(storage, `${product.name}/${files.name}`);
        const fileUp = await uploadBytes(archivoRef, files);
        // obtener url de descarga
        urlDescarga = await getDownloadURL(archivoRef);
        console.log(fileUp);
        setFile(urlDescarga);
      } catch (error) {
        console.log(error.message);
      }
      console.log('Imagen Subida');
      setShowSpinner(false);
    } else {
      setErrorFile(true);
      setTimeout(() => {
        setErrorFile(false);
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct({
      ...product,
      id: setID(),
      category: checked,
      createdAt: getDate(),
      image: file,
    });
    setWarning(true);
  };

  const handleSubmitProduct = async () => {
    // const name = product.name.replaceAll(' ', '-').toLowerCase();
    try {
      console.log('Guardando...');
      await addDoc(collection(firestore, 'inventario'), product);
    } catch (error) {
      console.log(error.message);
    }
    console.log('Base de datos actualizada');
    product.name = '';
    product.description = '';
    product.price = '';
    product.quantity = '';
    setChecked(false);
    setFile(undefined);
    await getData();
    setTimeout(() => {
      setModalProduct();
    }, 1000);
  };

  return (
    <>
      {warning ? (
        <WarningAlert
          handleSubmitProduct={handleSubmitProduct}
          setWarning={setWarning}
        />
      ) : null}
      <div className="fixed bg-gray-800 bg-opacity-95 flex flex-wrap items-center justify-center min-h-screen min-w-full top-0 animate__animated animate__faster animate__fadeIn z-40">
        <button
          className="absolute top-20 right-12"
          type="button"
          onClick={() => {
            setModalProduct(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="md:w-1/2 w-10/12 m-auto text-center bg-white px-4 py-4 rounded">
          <p className="text-lg">New Product</p>
          <form
            className="w-full"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              value={product.name}
              placeholder="Product Name"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              value={product.description}
              placeholder="Product Description"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="description"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              value={product.price}
              placeholder="Product Price"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="price"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              value={product.quantity}
              placeholder="Product Stock"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="quantity"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div className="w-full flex flex-wrap items-center my-4">
              <input
                name="category"
                type="checkbox"
                id="cbox2"
                className="mr-4"
                value={checked}
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="cbox2">Filtro Azul</label>
            </div>
            <div className="w-full flex justify-center relative">
              {errorFile ? (
                <div className="absolute top-0 bg-red-200 border-l-2 border-red-700 px-3 py-2 rounded-sm right-2">
                  <p className="text-sm">El archivo no es una imagen</p>
                </div>
              ) : null}
              <input
                type="file"
                placeholder="Product Image"
                className="w-full px-3 py-2 my-2 hidden"
                name="image"
                id="image"
                accept="images"
                onChange={(e) => {
                  fielHandler(e);
                }}
              />
              <label type="button" htmlFor="image" className="w-full px-3 py-2 my-2 bg-green-200 cursor-pointer rounded">{showSpinner ? 'Subiendo Imagen, Espere...' : 'Imagen'}</label>

            </div>
            <button type="submit" className="w-full bg-blue-400 px-4 py-2 rounded">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

ModalProduct.propTypes = {
  setModalProduct: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default ModalProduct;
