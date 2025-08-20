import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css'; // Asegúrate de que esta ruta sea correcta

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Define los endpoints aquí o impórtalos si tienes un archivo Endpoints.js
  const Endpoints = {
    getUrl: (endpoint) => {
      const BASE_URL = 'http://localhost:5000'; // Define tu URL base
      return `${BASE_URL}${endpoint}`;
    },
    SESION: {
      LOGIN: '/auth/login',
    },
  };

  const handleLogin = async () => {
    // 1. Validación de campos.
    if (!email || !password) {
      message.warning('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      // 2. Llama a la API de inicio de sesión.
      const loginResponse = await axios.post(Endpoints.getUrl(Endpoints.SESION.LOGIN), {
        email: email,
        password: password,
      });

      const { token, usuario } = loginResponse.data;

      // 3. Almacena la información del usuario en sessionStorage.
      if (token && usuario) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(usuario));
        message.success('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else {
        message.error('Respuesta de la API incompleta. No se pudo iniciar sesión.');
      }
    } catch (error) {
      // 4. Manejo de errores más detallado.
      console.error('Error al iniciar sesión:', error);
      if (error.response) {
        message.error(error.response.data.error || 'Credenciales incorrectas. Intenta de nuevo.');
      } else if (error.request) {
        message.error('No se pudo conectar con el servidor. Revisa tu conexión.');
      } else {
        message.error('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    } finally {
      // 5. Siempre restablece el estado de carga.
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bodyStyle={{ padding: '12px' }}>
        <h3 className="title-h3">INGRESAR</h3>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <h5 className="title-h5">Mail</h5>
          <Input
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5 className="title-h5">TOTP</h5>
          <Input.Password
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block
            onClick={handleLogin}
            loading={loading}
          >
            Ingresar
          </Button>

          <div className="login-links">
            <Link to="/sesion/recuperar">Recuperar</Link>
            <Link to="/sesion/registrar">Registrarse</Link>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;