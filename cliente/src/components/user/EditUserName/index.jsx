import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Auth from "../../../utils/auth";
import axios from "axios";
import "./EditUserName.css";

function EditUserName() {
  const { user, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [newUsername, setNewUsername] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleNameChange = async (event) => {
    const newUsernameValue = event.target.value;
    setUsername(newUsernameValue);

    try {
      const response = await axios.post("/api/check/users", {
        username: newUsernameValue,
      });
      setIsUsernameTaken(response.data.isTaken);
    } catch (error) {
      console.error("Error al verificar el nombre de usuario:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNewUsername("");

    if (isUsernameTaken) {
      console.error("Nombre de usuario ya está en uso.");
      return;
    }

    const token = Auth.getToken();

    const formData = new FormData();
    formData.append("userId", user.id_user);
    formData.append("username", username);

    try {
      const response = await axios.put("/api/users/update", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "ok") {
        updateUser({ ...user, username: username });
        setNewUsername("Nombre de usuario actualizado con éxito");
      } else {
        console.error("Error al actualizar el nombre de usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud API:", error);
    }
  };

  return (
    <div className="edit-name-form">
      <form onSubmit={handleSubmit}>
        <div className="label-container">
          <label htmlFor="name">Editar usuario</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={handleNameChange}
            className="name-input"
          />
        </div>
        {isUsernameTaken && <p>Nombre de usuario ya está en uso.</p>}
        {newUsername && <p>{newUsername}</p>}
        <button type="submit" className="save-button">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditUserName;
