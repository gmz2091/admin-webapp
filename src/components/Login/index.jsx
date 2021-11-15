import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseApp from '../../config/configFirebase';
import Spinner from '../Spinner';

const Login = () => {
  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  const [session, setSession] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showSpinner, setShowSpinner] = useState(false);

  const sessionActions = () => {
    // eslint-disable-next-line no-unused-expressions
    session ? window.location.replace = '/' : null;
  };

  useEffect(() => {
    sessionActions();
  }, []);

  return (
    <div className="w-full">
      {showSpinner ? <Spinner /> : <FormLog />}
    </div>
  );
};

export default Login;

const FormLog = () => {
  const auth = getAuth(FirebaseApp());
  const [sessionAuth, setSessionAuth] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showSpinner, setShowSpinner] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const { email, password } = form;
    console.log(email, password);
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (sessionAuth) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        window.localStorage.setItem('user', JSON.stringify(user.user.accessToken));
        console.log(user);
      } catch (error) {
        console.log(error.message);
        console.log(error.code);
      }
    } else {
      setShowSpinner(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="md:w-1/2 w-1/2 mt-16 m-auto">
      <h5>{sessionAuth ? 'Login' : 'Register'}</h5>
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        <input
          type="text"
          placeholder="username"
          className="w-full my-2"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full my-2"
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button type="submit" className="w-full px-4 py-2 bg-green-400">{sessionAuth ? 'Login' : 'Registrate'}</button>
        <button
          type="button"
          className="w-full px-4 py-2 bg-blue-400 my-12"
          onClick={() => {
            setSessionAuth(!sessionAuth);
          }}
        >
          {sessionAuth ? 'No tienes cuenta? Registrate' : 'Ya tienes cuenta? Inicia sesión'}
        </button>
      </form>
    </div>
  );
};
