import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './components/Login';
import Home from './Views/Home';
import FirebaseApp from './config/configFirebase';
import Inventario from './components/Inventarios';
import RequireAuth from './functions/Redirect';

const App = () => {
  const [userGlobal, setUserGlobal] = useState(null);
  const auth = getAuth(FirebaseApp());

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserGlobal(user);
    } else {
      setUserGlobal(null);
    }
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!userGlobal ? (
        <Router>
          <Switch>
            <RequireAuth user={userGlobal} exact path="/">
              <Home />
            </RequireAuth>
            <Route exact path="/login">
              <Login />
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
              component={Home}
            />
            <Route
              exact
              path="/inventario"
              component={Inventario}
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
