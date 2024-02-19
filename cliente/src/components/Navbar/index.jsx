import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import ExerciseList from "../../pages/ExerciseList/ExerciseList";
import logo from "../../assets/logo3.png"

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar">
      <div>
        <img className="logo" src={logo} />
      </div>
      <ul>
        {isAuthenticated ? (
          <div className={`nav_items ${isOpen && "open"}`}>
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="user/profile" onClick={closeMenu}>
                Perfil de usuario
              </Link>
            </li>
            <li onClick={ExerciseList}>
              <Link to="/exercise" onClick={closeMenu}>
                Ejercicios
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={closeMenu}>
                Mis Favoritos
              </Link>
            </li>
            <li onClick={logout}>
            <Link to="/" onClick={closeMenu}>
                Salir
              </Link>
            </li>
          </div>
        ) : (
          <div className={`nav_items ${isOpen && "open"}`}>
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/auth/login" onClick={closeMenu}>
                Ingresar
              </Link>
            </li>
            <li>
              <Link to="/auth/register" onClick={closeMenu}>
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </ul>
      <div
        className={`nav_toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}

export default Navbar;
