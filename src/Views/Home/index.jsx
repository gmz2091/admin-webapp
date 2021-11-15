import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import {
  Link,
} from 'react-router-dom';
import FirebaseApp from '../../config/configFirebase';

const Home = () => {
  const auth = getAuth(FirebaseApp());
  const text = 'Home';

  return (
    <div className="w-full flex justify-center mt-20">
      <button
        type="button"
        className="rounded absolute top-14 right-14 bg-blue-900 text-white px-4 py-2"
        onClick={() => {
          signOut(auth);
        }}
      >
        Log Out

      </button>
      {text}
      <div className="w-1/2 m-auto">
        <Link to="/inventario" className="bg-blue-400 px-4 py-2 rounded">Inventario</Link>
      </div>
    </div>
  );
};

export default Home;

Home.propTypes = {

};
