/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WarningAlert from '../WarningAlert';
import './main.css';

const ModalProduct = ({ setModalProduct }) => {
  const [checked, setChecked] = useState(false);
  const [warning, setWarning] = useState(false);
  const [file, setFile] = useState(null);
  const [errorFile, setErrorFile] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState(
    {
      name: '',
      description: '',
      price: '',
      image: '',
      quantity: '',
    },
  );

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

  const fielHandler = (e) => {
    const files = e.target.files[0];
    if (files.type === 'image/jpeg' || files.type === 'image/png') {
      setFile(files);
    } else {
      setErrorFile(true);
      setTimeout(() => {
        setErrorFile(false);
      }, 2000);
    }
    setFile(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct({
      ...product,
      category: checked,
      createdAt: getDate(),
    });
    setWarning(true);
  };

  const handleSubmitProduct = () => {
    console.log(file);
  };

  return (
    <>
      {warning ? (
        <WarningAlert
          handleSubmitProduct={handleSubmitProduct}
          setWarning={setWarning}
        />
      ) : null}
      <div className="fixed bg-gray-800 bg-opacity-95 flex flex-wrap items-center justify-center min-h-screen min-w-full top-0">
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
              placeholder="Product Name"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              placeholder="Product Description"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="description"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              placeholder="Product Price"
              className="w-full px-3 py-2 my-2 bg-gray-100 focus:outline-none"
              name="price"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
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
              <label type="button" htmlFor="image" className="w-full px-3 py-2 my-2 bg-green-200 cursor-pointer rounded">Imagen</label>

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
};

export default ModalProduct;
