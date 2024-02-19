import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Activate() {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const { activationCode: registrationCode } = useParams();

  useEffect(() => {
    const activationAccount = async () => {
      if (registrationCode) {
        try {
          const response = await axios.put(
            `/api/users/validate/${registrationCode}`
          );
          if (response.data.status === "ok") {
            setActivationSuccess(true);
          }
        } catch (error) {
        }
      }
    };
    activationAccount();
  }, [registrationCode]);

  if (!activationSuccess) {
    return <h3>Error al intentar activar la cuenta</h3>;
  }

  return (
    <>
      <h2>Tu cuenta se ha activado con exito!!! BIENVENIDO </h2>
      <p>
        <Link to="/auth/login">Iniciar Sesión</Link>
      </p>
    </>
  );
}

export default Activate;
