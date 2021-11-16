import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router,
  Route,
  Switch, Redirect,
} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Login from './components/Login';
import Home from './Views/Home';
import FirebaseApp from './config/configFirebase';
import Inventario from './components/Inventarios';

const App = () => {
  const [userGlobal, setUserGlobal] = useState(null);
  const auth = getAuth(FirebaseApp());

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserGlobal(user);
        <Redirect to="/" />;
    } else {
      setUserGlobal(null);
    }
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userGlobal !== null ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/inventario">
              <Inventario />
            </Route>
            <Route
              path="/login"
              exact
            >
              <Redirect to="/" />
            </Route>
            {/* <Route component={page404} /> */}
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route
              path="/"
              exact
            >
              <Redirect to="/login" />
            </Route>
            <Route
              path="/inventario"
              exact
            >
              <Redirect to="/login" />
            </Route>
            <Route
              exact
              path="/login"
              component={Login}
            />
            {/* <Route component={page404} /> */}
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;

// eslint-disable-next-line no-lone-blocks
{ /* <div className="w-full">
        <div className="">
          {userGlobal
            ? <Home /> : <Login />}
        </div>
      </div> */ }
