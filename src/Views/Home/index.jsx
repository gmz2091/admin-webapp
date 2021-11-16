import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import {
  Link,
} from 'react-router-dom';
import FirebaseApp from '../../config/configFirebase';
import './main.css';

const Home = () => {
  const auth = getAuth(FirebaseApp());

  return (
    <>
      <button
        type="button"
        className="rounded absolute top-8 right-14 bg-blue-900 text-white px-4 py-2"
        onClick={() => {
          signOut(auth);
        }}
      >
        Log Out

      </button>
      <div className="w-full flex
    justify-center mt-20"
      >
        <Link to="/inventario" className="py-4 m-auto bg-custom-blue rounded text-white items-center justify-center">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="px-4 mt-2 ">Inventario</p>
        </Link>
        <Link to="/inventario" className="py-4 m-auto bg-custom-blue rounded text-white items-center justify-center">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="px-4 mt-2 ">Inventario</p>
        </Link>
        <Link to="/inventario" className="py-4 m-auto bg-custom-blue rounded text-white items-center justify-center">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="px-4 mt-2 ">Inventario</p>
        </Link>
      </div>
    </>
  );
};

export default Home;

Home.propTypes = {

};
