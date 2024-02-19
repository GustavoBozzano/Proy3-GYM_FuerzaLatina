import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./UserProfile.css";

const UserProfile = ({ toggleEditing }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <div>Por favor, inicia sesión para poder acceder al contenido.</div>;
  }

  if (!user) {
    return <div>Cargando perfil del usuario...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>PERFIL DE USUARIO</h2>
      <p className="user-profile-info">
        <b>Nombre de Usuario: </b>
        {user.username}
      </p>
      <p className="user-profile-info">
        <b>tipo de Usuario: </b>
        {user.role}
      </p>

      <button className="edit-profile-button" onClick={toggleEditing}>
        Editar Perfil
      </button>
    </div>
  );
};

export default UserProfile;
