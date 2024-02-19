import { useState } from "react";
import EditUserName from "../EditUserName";
import PassRecovery from "../PassRecovery";
import "./EditProfile.css";

function EditProfile({ toggleEditing }) {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    window.location.reload();
  };

  const handleModal = () => setShowModal((prev) => !prev);
  return (
    <div className="edit-profile-container">
      <h1>EDITAR PERFIL</h1>
      <EditUserName />
      <a href="#" onClick={handleModal} className="edit-profile-link">
        Actualizar contraseña
      </a>
      {showModal && <PassRecovery handleModal={handleModal} />}
      <div className="center">
        <button onClick={handleSave} className="edit-profile-button">
          Guardar
        </button>
        <button onClick={toggleEditing} className="edit-profile-button-cancel">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
