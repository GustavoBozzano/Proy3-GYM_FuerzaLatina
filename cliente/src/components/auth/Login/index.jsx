import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Modal from "../../Modal";
import Error from "../../Error";
import PassRecovery from "../../user/PassRecovery";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showPassRecovery, setshowPassRecovery] = useState(false);
  const [errorCredentials, setErrorCredentials] = useState(null);
  const [errorValues, setErrorValues] = useState("");

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorValues("");

    if (!credentials.email || !credentials.password) {
      setErrorValues("por favor completa todos los campos requeridos");
      return;
    }

    try {
      const response = await axios.post("api/users/login", credentials);
      login(response.data.data.token);
    } catch (error) {
      setShowModal(true);
      setErrorCredentials(error.response.data.message);
    }
  };

  const handleRecoveryPassModal = () => {
    setshowPassRecovery(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <h2>INGRESAR</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="">
          Correo
          <input
            required
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Ingresa tu email"
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
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
        </label>

        {errorValues && <p style={{ color: "red" }}>{errorValues}</p>}

        <button type="submit">Ingresar</button>
        <a href="#" onClick={() => setshowPassRecovery(true)}>
          ¿Olvidaste tu contraseña?
        </a>
      </form>
      {showPassRecovery && (
        <Modal onClick={handleRecoveryPassModal}>
          <PassRecovery handleModal={handleRecoveryPassModal} />
        </Modal>
      )}
      {showModal && (
        <Modal onClick={handleModalClose}>
          <Error
            errorMessage={errorCredentials}
            closeModal={handleModalClose}
          />
        </Modal>
      )}
    </>
  );
};

export default Login;
