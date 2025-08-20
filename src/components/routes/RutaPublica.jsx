import { Navigate } from 'react-router-dom';

const RutaPublica = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const isAuthenticated = token && token !== 'undefined' && token !== '';
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default RutaPublica;
