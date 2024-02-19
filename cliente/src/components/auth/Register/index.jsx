import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";

import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorCredentials, setErrorCredentials] = useState("");
  const [notOkRegister, setNotOkRegister] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotOkRegister("");
    setErrorConfirmPassword("");
    setErrorCredentials("");

    if (credentials.password !== credentials.confirmPassword) {
      setErrorConfirmPassword("Las contraseñas no coinciden");
      return;
    }

    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setErrorCredentials("por favor completa todos los campos requeridos");
      return;
    }

    try {
      const response = await axios.post("api/users/register", credentials);
      if (response.data.status === "ok") {
        setShowModal(true);
        setCredentials({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrorConfirmPassword("");
      }
    } catch (error) {
      setNotOkRegister(error.response.data.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/auth/login");
  };

  return (
    <>
      <h2>REGISTRO</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="">
          Usuario
          <input
            required
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Ingresa usuario"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Correo
          <input
            required
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Ingresa email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Contraseña
          <input
            required
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Ingresa contraseña"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Confirmar Contraseña
          <input
            required
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            placeholder="Confirma la contraseña"
            onChange={handleChange}
          />
        </label>

        {errorConfirmPassword && (
          <p style={{ color: "orange" }}>{errorConfirmPassword}</p>
        )}
        {errorCredentials && (
          <p style={{ color: "orange" }}>{errorCredentials}</p>
        )}
        {notOkRegister && <p style={{ color: "orange" }}>{notOkRegister}</p>}

        <button type="submit">Ingresar</button>
      </form>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <p>
            {" "}
           ¡Usuario registrado exitosamente! Por favor, activa tu cuenta a
            través del email que te hemos enviado.
          </p>
          <button onClick={handleModalClose}>Ok</button>
        </Modal>
      )}
    </>
  );
};

export default Register;
