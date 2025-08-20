import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Scanner } from './components/pages/scanner/Scanner';
import Login from './components/pages/sesion/componentes/Login';
import RutaPublica from './components/routes/RutaPublica';
import RutaProtegida from './components/routes/RutaProtegida';
import { Dashboard } from './components/pages/dashboard/componentes/Dashboard';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Navigate to='/sesion/login' replace />} />

        <Route
          path='/sesion/login'
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />
        <Route 
          path='/scanner' 
          element={
            <Scanner/>
          } 
        />
        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
};
