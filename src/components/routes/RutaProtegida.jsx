import { message } from "antd";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const RutaProtegidaTipoToken = ({ children, tiposPermitidos = [] }) => {
  const tipo = localStorage.getItem("tipo");
  const token = localStorage.getItem("token");

  const isTokenValid = token && token !== "undefined" && token !== "";
  const isTipoPermitido = tiposPermitidos.includes(tipo);
  const isAuthorized = isTokenValid && isTipoPermitido;

  useEffect(() => {
    if (!isAuthorized) {
      message.error("Algo sucedió. Contacte al administrador del sistema.");
    } else if (!isTokenValid) {
      message.warning(
        "No tienes un token válido. Por favor, inicia sesión para acceder a esta ruta."
      );
    } else if (!isTipoPermitido) {
      message.warning(
        "Esta es una ruta protegida. Si no puedes acceder, seguramente no tengas el rol adecuado."
      );
    }
  }, [isAuthorized, isTipoPermitido, isTokenValid]);

  return isAuthorized ? children : <Navigate to="/ingresar" replace />;
};

export default RutaProtegidaTipoToken;
