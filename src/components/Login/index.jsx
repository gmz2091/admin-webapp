import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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

    const { email, password } = form;

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (sessionAuth) {
      setShowSpinner(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // window.localStorage.setItem('user', JSON.stringify(user.user.accessToken));
        // console.log(user);
      } catch (error) {
        console.log(error.message);
        console.log(error.code);
      }
      setShowSpinner(false);
        <Redirect to="/" />;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="md:w-1/2 w-1/2 mt-16 m-auto">
      <h5>Login</h5>
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
        <button type="submit" className="text-center text-lg w-full px-4 py-2 bg-green-400">{showSpinner ? (<Spinner />) : 'Login' }</button>
      </form>
    </div>
  );
};
