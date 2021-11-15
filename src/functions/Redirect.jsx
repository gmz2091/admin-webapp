import React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children, user }) => {
  const location = useLocation();

  if (user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
