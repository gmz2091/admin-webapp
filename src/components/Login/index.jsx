import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Redirect } from 'react-router';
import FirebaseApp from '../../config/configFirebase';
import Spinner from '../Spinner';

const Login = () => {
  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  const [session, setSession] = useState(false);
  // eslint-disable-next-line no-unused-vars

  return (
    <div className="w-full">
      <FormLog />
    </div>
  );
};

export default Login;

const FormLog = () => {
  const auth = getAuth(FirebaseApp());
  // eslint-disable-next-line no-unused-vars
  const [sessionAuth, setSessionAuth] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [error400, setError400] = useState(false);
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

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (email === '' || password === '') {
      return setErrorInput(true);
    } if (password.length < 6) {
      return alert('La contraseña debe tener al menos 6 caracteres');
    }

    if (sessionAuth) {
      setShowSpinner(true);
      setErrorInput(false);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // window.localStorage.setItem('user', JSON.stringify(user.user.accessToken));
        // console.log(user);
      } catch (error) {
        console.log(error.message);
        console.log(error.code);
        if (error.code === 'auth/wrong-password') {
          setError400(true);
        }
      }
      setShowSpinner(false);
        <Redirect to="/" />;
    }
    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="lg:w-1/4 md:w-1/2 w-10/12 mt-16 m-auto">
      <h5 className="text-2xl">Login</h5>
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        <input
          type="text"
          placeholder="username"
          className={`w-full my-2 px-3 py-2 focus:outline-none rounded ${errorInput ? 'border border-red-700' : ''}`}
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div className="w-full relative">
          {error400
            ? <p className="bg-red-200 border-l-2 border-red-700 text-red-700 p-2 ">Password Incorrect</p> : null}
          <input
            type="password"
            placeholder="password"
            className={`w-full my-2 px-3 py-2 focus:outline-none rounded ${errorInput ? 'border border-red-700' : ''}`}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />

        </div>
        <button type="submit" className="text-center text-lg w-full px-4 py-2 bg-green-400">{showSpinner ? (<Spinner />) : 'Login' }</button>
      </form>
    </div>
  );
};
